import {createSelector} from 'reselect';
import {Store, Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import * as Immutable from 'immutable';
import {Resource} from 'restore';
import { IPersistorConfig, IAdapterConfig } from '../../../restore';

import { relatedToClass } from './relatedToClass';

// import {IResourceAdapter,
//   IResourceRequestConfig, 
//   IEntityState, 
//   IPersistorConfig, 
//   IAdapterConfig} from './interfaces';

/**
 * 
 */
export class uiResource extends Resource {
  
  public type: string;
  public relateds: Object;
  
  constructor(public $ngRedux, ApiV2Adapter, public $injector) {
    super($ngRedux, ApiV2Adapter)
  }  
  
  /**** 
   * Sync interface 
   * 
  * */

  // TODO: Write an interface for the case object -- also need to update
  //  the return type, likely to an Immutable.Map
  // get a case from server store
  get( id: (number | string), className?: string ): Object {
    if( ! id ) {
      throw new Error(`uiResource.get: 'type' and 'id' are required but were ${type} and ${id} `);
    };

    className = className || this.className;
    // in some case a numeric id may come in as a string
    id = Number.isNaN(parseInt(id, 10)) ? id : parseInt(id, 10);

    if( typeof id === 'string') {
      return this.$ngRedux.getState().entities[className].items.get(id);
    } else if ( typeof id === 'number' ){
      return this.$ngRedux.getState().entities[className].items.find((item) => item.get('id') == id);
    }
  }

  // Gets an individual item related to the current resource
  getRelated( id: (number | string), relName: string ) {
    if( ! id || ! relName ) return;

    let relatedHref = this._getRelatedHref(id, relName);
    // all resources should be Immutable.Maps
    if( ! relatedHref ) {
      return Immutable.Map();
    }
    return this.get( id, this.relateds[relName].className )
  }

  // By default gets a list of the current type
  getList(uri?: string, className?: string) {
    uri = uri || this.url;
    let list = this.$ngRedux.getState().list.get(uri);
    if( list ) {
      return list.result.get(list.page).map((id) => {
        return this.get(id, className);
      });
    }
    return Immutable.List();
  }

  // Get a related List 
  getRelatedList( id, relName: string ): Array<any> {
    if( ! id || ! relName ) return;

    let baseItem = this.get(id);
    let relatedUri: string = (baseItem.get('_links').toJS())[relName].href;

    return this.getList( relatedUri, this.relateds[relName].className );
  }

  // TODO: implement the set method -- bring over the update stuff 
  //  that is being done elsewhere
  // Determine if it should remain as a synch or if it should be async 
  //  since it will kick off an asynch action.
  set( id, value ) {}

  /**** 
   * Async interface
   *  
  * */

  // Tries to get a list from server store and falls back to 
  //  making a request to the backend for it. 
  getListAsync(): PromiseLike<any> {
    let resourceList = this.getList();
    if( resourceList.size ) {
      return Promise.resolve( resourceList )
    }
    return this.list().then( () => {
      return this.getList();
    })
  }

  // NOTE: Override in resource classes
  list(persistorConfig?: IPersistorConfig, adapterConfig?: IAdapterConfig): PromiseLike<any> {
    return Promise.resolve();
  }

  // Populates a related single items
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

  // Populates a list in the server store for a resource's related lists
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
