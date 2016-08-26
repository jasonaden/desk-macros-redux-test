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
  
  public type: string;
  public relateds: Object;
  
  constructor(public $ngRedux, ApiV2Adapter) {
    super($ngRedux, ApiV2Adapter)
  }  
  
  /**** **********
   * Sync interface 
  * ***************/

  // TODO: Write an interface for the case object -- also need to update
  //  the return type, likely to an Immutable.Map
  // get a case from server store
  // get( id: (number | string), className?: string ): Object {
  get( id: (number | string), className?: string ): Map<K,V> {
    if( ! id ) {
      throw new Error(`uiResource.get: 'id' is required but were not set for a call to ${this.className}`);
    };

    className = className || this.className;
    // in some case a numeric id may come in as a string
    id = Number.isNaN(parseInt(id, 10)) ? id : parseInt(id, 10);

    let entityStore = this.$ngRedux.getState().entities.get(className);
    if ( !entityStore ) { return null; }

    if ( typeof id === 'string') {
      return  entityStore.items.get(id);
    } else if ( typeof id === 'number' ){
      return entityStore.items.find((item) => item.get('id') == id);
    }
  }

  // By default gets a list of the current types instances
  getList(uri?: string, className?: string) {
    uri = uri || this.url;
    let list = this.$ngRedux.getState().lists.get(uri);
    if( list ) {
      return list.result.get(list.page).map((id) => {
        return this.get(id, className);
      });
    }
    return Immutable.List();
  }

  // Gets an individual item related to the current resource
  getRelated( id: (number | string), relName: string ) {
    if( ! id || ! relName ) return;

    let relatedHref = this._getRelatedHref(id, relName);
    // all resources should be Immutable.Maps
    if( ! relatedHref ) {
      return Immutable.Map();
    }
    return this.get( relatedHref, this.relateds[relName].className )
  }

  // Get a related List
  getRelatedList( id, relName: string ): Array<any> {
    if( ! id || ! relName ) return;

    let relatedUri = this._getRelatedHref(id, relName);
    return this.getList( relatedUri, this.relateds[relName].className );
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
  populateRelated( id: string, relName: string): PromiseLike<any> {

    let relatedHref = this._getRelatedHref(id, relName);

    if( ! relatedHref ) {
      return Promise.resolve();
    }
    let relatedId = relatedHref.split('/').pop();

    let persistorConfig = {url: relatedHref}; 
    let adapterConfig = {
      uri: relatedHref,
      schemaName: this.relateds[relName].schemaName
    }
    return this.findOne( relatedId, persistorConfig, adapterConfig )
      .then( undefined, (err) => {
        console.log("***** populateRelated failed: ", err)
      })
  }

  // Populates a related list of items
  populateRelatedList(id: string, relName: string, persistorConfig: any = {}): PromiseLike<any> {
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
  getAsync( id: number ): PromiseLike<any> {
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
  destroy( id ) {}

  /** Internal functions
   * 
   */
  _getRelatedHref(id, relName): string {
    let baseItem = this.get(id);
    let relatedLink = baseItem.get('_links').toJS()[relName];

    if( relatedLink ) {
      return relatedLink.href;
    } else {
      return ''
    }

  }

}
