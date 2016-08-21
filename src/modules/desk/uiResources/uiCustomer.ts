import {Action} from 'flux-standard-action';
import * as Immutable from 'immutable';
// import { uiResource } from 'restore';
import { uiResource } from './uiResource';
import { Store } from 'redux';
import { relatedToClass } from './relatedToClass';

// import {Resource, defaultReducer, defaultListReducer} from 'restore';
// import { IPersistorConfig, IAdapterConfig } from '../../../restore';
// import {caseSchema} from './config/schemas';
// import {ApiV2Adapter} from './config/apiv2-adapter';

/**
 * Module name
 */
export const CLASS_NAME = "CUSTOMER";
export const LIST_NAME = "CUSTOMERLIST";
const CHANGES = "CHANGESLIST";

// export interface uiCase {
//   id: number,
//   subject: string,
//   adapter: any,
//   macros: Number[]
// }

export class uiCustomer extends uiResource {
  // public url = '/cases';
  public className = CLASS_NAME;
  public type: string = 'customer';
  public store: Store;
  
  constructor(public $ngRedux, public Case, public $injector) {
    super( $ngRedux, $injector );

  }

  /***** 
   * Synchronous interface 
  * */

  // TODO: Provide an interface for the case object -- also need to update
  //  the return type, likely to an Immutable.Map
  get( id: (number | string) ): Object {
    return super.get( this.type, id );
  }

  getRelated( id: (number | string), relName: string ): Array<any> {
    return super.getRelated( this.type, id, relName);
  }

  /***** 
   * Asynchronous interface 
  * */
  
  populateRelated(id: string, relName: string): PromiseLike<any> {
    if( ! id || ! relName ) return;

    let baseItem = this.get(id)
    let {'class': relClass, 'href': relHref} = baseItem.get('_links').toJS()[relName];
    
    if( ! relHref  ) {
      throw new Error(`No relationship ${relName} exists on case with id: ${baseItem.id}` )
    }

    // get the Resource for the related item
    let relResource = this.$injector.get( relatedToClass[relClass] );
    // TOOD: For now, extract the ID, but may want to expand the Resource.findOne() 
    //  and other methods to accept either a numeric ID or a URI
    let relId = relHref.split('/').pop()

    return relResource.findOne( relId )
  }


}


// export const CaseReducer = defaultReducer(CLASS_NAME);
// export const CaseListReducer = defaultListReducer(LIST_NAME);
// export const ChangesReducer = defaultListReducer(CHANGES);

/***  EXAMPLES OF HOW TO GET STUFF 
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


