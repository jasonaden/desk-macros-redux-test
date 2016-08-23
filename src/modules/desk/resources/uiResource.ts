import {createSelector} from 'reselect';
import {Store, Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import * as Immutable from 'immutable';
import {Resource} from 'restore';

import { relatedToClass } from './relatedToClass';
// import {identity} from 'lodash';

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
  
  constructor(public $ngRedux, ApiV2Adapter, public $injector) {
    super($ngRedux, ApiV2Adapter)
  }  
  
  /**** 
   * Sync interface 
  * */

  // TODO: Write an interface for the case object -- also need to update
  //  the return type, likely to an Immutable.Map
  // get a case from server store
  get( type: string, id: (number | string) ): Object {
    if( ! type || ! id ) {
      throw new Error(`uiResource.get: 'type' and 'id' are required but were ${type} and ${id} `);
    };

    // in some case a numeric id may come in as a string
    if( typeof id === 'string') {
      id = parseInt( id, 10 )
    }

    // map the related name to its class
    type = relatedToClass[type].toLowerCase();

    if( typeof id === 'string') {
      return this.$ngRedux.getState().entities[type].items.get(id);
    } else if ( typeof id === 'number' ){
      return this.$ngRedux.getState().entities[type].items.find((item) => item.get('id') == id);
    }
  }

  
  getById(id) {
    return this.$ngRedux.getState().entities[this.type].items.find((item) => item.get('id') == id);
  }

  getByURI(uri) {
    return this.$ngRedux.getState().entities[this.type].items.get(uri);
  }

  getList() {
    let uri = this.url;
    let list = this.$ngRedux.getState().list.get(uri);
    debugger;
    let results = list.result.get(list.page);
    return list.result.get(list.page).map((id) => {
      return this.getByURI(id);
    });
  }



  getRelated( baseItem, relateds: Object, relName: string ): Array<any> {
    let {'class': relClass, 'href': relHref} = baseItem.get('_links').toJS()[relName];
    if( ! relHref || ! relClass ) {
      throw new Error(`No proper relationship ${relName} exists on ${this.type} with id: ${baseItem.id}` )
    }
    // get the id of the related item
    let relId = relHref.split('/').pop()
    // Get the appropriate uiResource
    let relUiResource = this.$injector.get( relateds[relClass].uiResource );

    return relUiResource.get( relId );
  }

  // TODO: implement set() method and popget() method.
  // Implement methods for populating (asynch) and getting (synch) lists. 
  // Expland the populateRelated() method so it can handle getting multiple
  //  properties including properties of lists.

  // TODO: implement the set method -- bring over the update stuff 
  //  that is being done elsewhere
  // Determine if it should remain as a synch or if it should be async 
  //  since it will kick off an asynch action.
  set( id, value ) {
    
  }

  /**** 
   * Async interface 
  * */
  populateRelated( baseItem, relateds: Object, relName): PromiseLike<any[]> {

    let {'class': relClass, 'href': relHref} = baseItem.get('_links').toJS()[relName];
    if( ! relHref  ) {
      throw new Error(`No relationship ${relName} exists on case with id: ${baseItem.id}` )
    }

    // get the Resource for the related item
    let relResource = this.$injector.get( relateds[relClass].class );
    let relId = relHref.split('/').pop()

    // TODO: Check here if it is in store and only findOne() if it isn't
    return relResource.findOne( relId )
  }

  populateRelatedList(id: string, relName: string, persistorConfig: any = {}): PromiseLike<any> {
    if( ! id || ! relName ) return;

    let baseItem = this.getById(id);
    let baseLinks = baseItem.get('_links').toJS();
    let link = baseLinks[relName];

    if( !link ) {
      throw new Error(`No proper relationship ${relName} exists on ${this.type} with id: ${id}` )
    }

    this.find(Object.assign({url: link.href, baseUrl: 'http://localhost:8888'}, persistorConfig) , {uri: link.href});
  }
  /*

  // TODO: Just copied as an example of what might be done, not coded.
  populateRelatedList( baseItem, relateds: Object, relName, params): PromiseLike<any[]> {

    let {'class': relClass, 'href': relHref} = baseItem.get('_links').toJS()[relName];
    if( ! relHref  ) {
      throw new Error(`No relationship ${relName} exists on case with id: ${baseItem.id}` )
    }

    // get the Resource for the related item
    let relResource = this.$injector.get( relateds[relClass].class );
    let relId = relHref.split('/').pop()

    // TODO: Check here if it is in store and only findOne() if it isn't'
    return relResource.findOne( relId )
    
  }*/


}
