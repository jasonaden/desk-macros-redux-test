import {createSelector} from 'reselect';
import {Store, Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import * as Immutable from 'immutable';
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
export class uiResource {
  
  public type: string;
  
  constructor(public $ngRedux, public $injector) {}  
  
  /**** 
   * Sync interface 
  * */

  // TODO: Write an interface for the case object -- also need to update
  //  the return type, likely to an Immutable.Map
  // get a case from server store
  get( type: string, id: (number | string) ): Object {
    if( ! type || ! id ) return;

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
    
  }

}
