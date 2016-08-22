import {Action} from 'flux-standard-action';
import * as Immutable from 'immutable';
import { uiResource } from './uiResource';
import { Store } from 'redux';
import { relatedToClass } from './relatedToClass';
import { caseRelateds as relateds } from './relatedToClass';


// import {Resource, defaultReducer, defaultListReducer} from 'restore';
// import { IPersistorConfig, IAdapterConfig } from '../../../restore';
// import {caseSchema} from './config/schemas';
// import {ApiV2Adapter} from './config/apiv2-adapter';

/**
 * Module name
 */
export const CLASS_NAME = "CASE";
export const LIST_NAME = "CASELIST";
const CHANGES = "CHANGESLIST";

export interface uiCase {
  id: number,
  subject: string,
  adapter: any,
  macros: Number[]
}

export class uiCase extends uiResource {

  public className = CLASS_NAME;
  public type: string = 'case';
  public store: Store;
  
  constructor(public $ngRedux, public Case, public $injector) {
    super( $ngRedux, $injector );
  }

  /***** 
   * Synchronous interface
   * 
   *  All methods in the synch interface return synchronous data by directly
   *  selecting from the server store.
  * */

  // TODO: Provide an interface for the case object -- also need to update
  //  the return type, likely to an Immutable.Map
  // get a case from server store
  get( id: (number | string) ): Object {
    return super.get( this.type, id );
  }

  getRelated( id: (number | string), relName: string ): Array<any> {
    let baseItem = this.get( id );
    return super.getRelated( baseItem, relateds, relName );
  }

  /***** 
   * Asynchronous interface 
   * 
   * All methods in the asych interface return promises. They are used to 
   * populate the server store or to combine populating the server store
   * with synchronously requesting the data put into the server store.
  **/

  // Gets the case and the href for the specified related item.
  // Then invokes the appropriate resource's findOne or find to 
  // get the data and populate the server store 
  populateRelated(id: string, relName: string): PromiseLike<any> {
    if( ! id || ! relName ) return;

    let baseItem = this.get(id)
    return super.populateRelated( baseItem, relateds, relName );
  }

  // TODO: Make this work so it will get a list of items
  //  and put them into store.list.NOTESLIST['default'? | URI].
  populateRelatedList(id: string, relName: string, params: Object): PromiseLike<any> {
    if( ! id || ! relName ) return;

    let baseItem = this.get(id)
    //TODO: Not done, just put in as an idea of what might go here.
    return super.populateRelatedList( baseItem, relateds, relName, params );
  }


  populateGetRelated(id: string, relName: string): PromiseLike<any> {
    if( ! id || ! relName ) return;

    let baseItem = this.get(id)
    return super.populateRelated( baseItem, relateds, relName )
    .then( () => {
      return Promise.resolve( this.getRelated( id, relName ) );
    })
  }


}

/*** KEPT TO HAVE THE SELECTORS AVAILABLE WHILE DEVELOPING THIS CLASS 
export const getAllCases = (state) => {
  let entities = state.entities.case;
  return entities.items.toList();
}

export const getChangesCases = (state) => {
  if (state.lists.CHANGESLIST.page && state.lists.CHANGESLIST.result.get(state.lists.CHANGESLIST.page)){
    return state.lists.CHANGESLIST.result.get(state.lists.CHANGESLIST.page).map( (r) => {
      return getCaseById(state, r);
    });
  } else {
    return Immutable.List();
  }
}

export const getListCases = (state) => {
  if (state.lists.CASELIST.page && state.lists.CASELIST.result.get(state.lists.CASELIST.page)){
    return state.lists.CASELIST.result.get(state.lists.CASELIST.page).map( (r) => {
      return getCaseByURI(state, r);
    });
  } else {
    return Immutable.List();
  }
}

export const getCaseById = (state, id) => {
  return state.entities.case.items.find((kase) => kase.get('id') == id);
}

export const getCaseByURI = (state, id) => {
  return state.entities.case.items.get(id);
}

export const APPLY_MACRO = 'APPLY_MACRO';
export const MACRO_APPLY_ERROR = 'MACRO_APPLY_ERROR';
export function applyMacro (payload: Object): Action<Object> {
  return {
    type: APPLY_MACRO, 
    payload
  };
}

*/


