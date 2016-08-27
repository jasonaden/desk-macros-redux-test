import {createSelector} from 'reselect';
import {Store, Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import * as Immutable from 'immutable';
import {Resource} from 'restore';
import { IPersistorConfig, IAdapterConfig } from '../../../restore';

import { relatedToClass } from './relatedToClass';

/**
 * 
 */
export class uiResource extends Resource {
  
  public relateds: Object;
  
  constructor(public $ngRedux, ApiV2Adapter, public $injector) {
    super($ngRedux, ApiV2Adapter)
  }  
  
  /**** **********
   * Sync interface 
  * ***************/

  // TODO: Write an interface for the case object -- also need to update
  //  the return type, likely to an Immutable.Map
  // get a case from server store
  // get( id: (number | string), className?: string ): Object {
  get<K,V>( id: (number | string), className?: string ): Immutable.Map<K,V> {
    if( ! id ) {
      throw new Error(`uiResource.get: 'id' is required but were not set for a call to ${this.className}`);
    };

    className = className || this.className;
    // in some case a numeric id may come in as a string
    if( typeof id === 'string') {
      id = Number.isNaN(parseInt(String(id), 10)) ? id : parseInt(String(id), 10);
    }
    let entityStore = this.$ngRedux.getState().entities.get(className);
    // TODO: Maybe: change this to return an empty Map
    if ( !entityStore ) { return null; }

    if ( typeof id === 'string') {
      return  entityStore.items.get(id);
    } else if ( typeof id === 'number' ){
      return entityStore.items.find((item) => item.get('id') == id);
    }
  }

  // By default gets a list of the current types instances but can
  //  get a list of other types
  getList<T>(uri?: string, className?: string): Immutable.List<T> {
    uri = uri || this.url;
    let list = this.$ngRedux.getState().lists.get(uri);
    if( list ) {
      return list.result.get(list.page).map((id) => {
        return this.get(id, className);
      });
    }
    return Immutable.List<T>();
  }

  // Gets an individual item related to the current resource
  getRelated<K,V>( id: (number | string), relName: string ): Immutable.Map<K,V> {
    if( ! id || ! relName ) return;

    let relatedHref = this._getRelatedHref(id, relName);
    // all resources should be Immutable.Maps
    if( ! relatedHref ) {
      return Immutable.Map<K,V>();
    }
    return this.get<K,V>( relatedHref, this.relateds[relName].className )
  }

  // Get a related List 
  // getRelatedList( id, relName: string ): Array<any> {
  getRelatedList<T>( id: (number | string), relName: string ): Immutable.List<T> {
    if( ! id || ! relName ) return;

    let relatedUri = this._getRelatedHref(id, relName);
    return this.getList<T>( relatedUri, this.relateds[relName].className );
  }

  // TODO: implement the set method -- bring over the update stuff 
  //  that is being done elsewhere
  // Determine if it should remain as a synch or if it should be async 
  //  since it will kick off an asynch action.
  set( id, value ) {}

  /** *************
   * Async interface
  * ***************/

  // NOTE: Override in resource classes
  list(persistorConfig?: IPersistorConfig, adapterConfig?: IAdapterConfig): PromiseLike<any> {
    return Promise.resolve();
  }

  // Populates a related single item
  populateRelated( id: (number | string), relName: string): PromiseLike<any> {

    let relatedHref = this._getRelatedHref(id, relName);

    if( ! relatedHref ) {
      return Promise.resolve();
    }
    let relatedId = parseInt(relatedHref.split('/').pop(), 10);

    let persistorConfig = {url: relatedHref}; 
    let adapterConfig = {
      uri: relatedHref,
      schemaName: this.relateds[relName].schemaName
    }
    return this.findOne( relatedId, persistorConfig, adapterConfig )
  }

  // Populates a related list of items 
  populateRelatedList(id: (number | string), relName: string, persistorConfig: any = {}): PromiseLike<any> {
    if( ! id || ! relName ) return Promise.resolve();

    let relatedHref = this._getRelatedHref(id, relName);
    if( ! relatedHref ) {
      return Promise.resolve();
    }

    persistorConfig = Object.assign( 
      {url: relatedHref}, 
      persistorConfig
    )
    let adapterConfig = {
      uri: relatedHref,
      schemaName: this.relateds[relName].listSchemaName
    }
    return this.find( persistorConfig, adapterConfig )
  }

  /** ************
   *  Methods for getting a resource or a list of resources 
   * *************/
  // Returns a resource,  populating the server store if needed 
  getAsync( id: (number | string) ): PromiseLike<any> {
    let resource = this.get(id)
    if( resource ) {
      return Promise.resolve(resource)
    } else {
      return this.findOne(id).then( () => {
        return this.get(id)
      })
    }
  }
  // Returns a list of the current resource, populating the server store if needed
  getListAsync(uri?:string): PromiseLike<any> {
    let resourceList = this.getList(uri || this.url);
    if( resourceList.size ) {
      return Promise.resolve( resourceList )
    }
    return this.list().then( () => {
      return this.getList(uri || this.url);
    })
  }

  /** ************
   *  Methods for getting a related resource or a list of related resources 
   * ************/
  // Returns a related item, populating the server store if needed
  getRelatedAsync( id: (number | string), relName: string ) {
    let related = this.getRelated(id, relName);
    if( related && related.size ) {
      return Promise.resolve( related )
    } else {
      return this.populateRelated(id, relName)
      .then( () => {
        return this.getRelated(id, relName)
      })
    }
  }

  // Returns a list of related items, populating the server store if needed 
  getRelatedListAsync( id, relName: string ): PromiseLike<any> {  
    let resourceRelatedList = this.getRelatedList( id, relName );
    if( resourceRelatedList.size ) {
      return Promise.resolve( resourceRelatedList )
    }
    return this.populateRelatedList(id, relName).then( () => {
      return this.getRelatedList( id, relName );
    })
  }

  // TODO: Implement so it loops through all case's _links and 
  //  removes them from either the server store. Will need to go 
  //  though both 'list' and 'entities'
  destroy( id ): PromiseLike<any> {
    // TODO: implement

    return Promise.resolve();
  }

  /** Internal functions
   * 
   */
  _getRelatedHref<V>(id: (number | string), relName): string {
    let baseItem: Immutable.Map<string,V> = this.get<string,V>(id);
    let relatedLink: {href:string} = baseItem.get('_links').toJS()[relName];
    if( relatedLink ) {
      return relatedLink.href;
    } else {
      return ''
    }

  }

}
