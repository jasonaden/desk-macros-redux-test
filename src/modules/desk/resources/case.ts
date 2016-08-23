import {Action} from 'flux-standard-action';
import * as Immutable from 'immutable';

import {Resource, defaultReducer, defaultListReducer} from 'restore';
import { uiResource } from './uiResource';
import { IPersistorConfig, IAdapterConfig } from '../../../restore';
import {caseSchema} from './config/schemas';
import {ApiV2Adapter} from './config/apiv2-adapter';
import { caseRelateds as relateds } from './relatedToClass';

/**
 * Module name
 */
export const CLASS_NAME = "CASE";
export const LIST_NAME = "CASELIST";
const CHANGES = "CHANGESLIST";

export interface ICase {
  id: number,
  subject: string,
  adapter: any,
  macros: Number[]
}

export class Case extends uiResource {
  public url = '/api/v2/cases';
  public className = CLASS_NAME;
  public type = CLASS_NAME.toLowerCase();
  
  constructor(public $ngRedux, ApiV2Adapter, $injector) {
    super($ngRedux, ApiV2Adapter, $injector);

    /*this.relatedSchemaNames = {
      notes: 'notesListSchema',
      customer: 'customerSchema'
    }*/
  }


/*** 
 * Interface for backend data store interactions
 *  
 */
  beforeAdd(payload, persistorConfig: IPersistorConfig, adapterConfig: IAdapterConfig): Array<any> {
    persistorConfig.url = this.url;
    persistorConfig.data = payload;
    return [persistorConfig, adapterConfig];
  }

  beforeFindOne(id, persistorConfig: IPersistorConfig): Array<any> {
    persistorConfig.url = this.url + '/' + id;
    return [persistorConfig];
  }

  beforeUpdate(id, patch, persistorConfig: IPersistorConfig, adapterConfig: IAdapterConfig): Array<any> {
    persistorConfig.url = this.url + '/' + id;
    persistorConfig.data = patch;
    return [persistorConfig, adapterConfig];
  }

  beforeDestroy(id, persistorConfig: IPersistorConfig, adapterConfig: IAdapterConfig): Array<any> {
    persistorConfig.url = this.url + '/' + id;
    return [persistorConfig, adapterConfig];
  }

  list(persistorConfig: IPersistorConfig = {}, adapterConfig: IAdapterConfig = {}) {
    return this.find(
      Object.assign(
        {
          url: this.url, 
          baseUrl: 'http://localhost:8888', 
          params: {embed: 'customer'}
        }, 
        persistorConfig
      ), 
      Object.assign(
        {
          uri: this.url,
          schemaName: 'CASELIST'
        },
        adapterConfig
      )
    );
  }

  changes(persistorConfig: IPersistorConfig = {}, adapterConfig: IAdapterConfig= {}) {
    adapterConfig.listName = CHANGES;
    persistorConfig = Object.assign({}, {url:'filters/11/cases/changes?cflpt=1471022097&cids=&embed=customer&filter_id=11&page=1&per_page=50&sort_direction=desc&sort_field=updated_at'}, persistorConfig)
    return this.find(persistorConfig, adapterConfig);
  }

  /***** 
   * Synchronous interface for Redux store
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

  populateGetRelated(id: string, relName: string): PromiseLike<any> {
    if( ! id || ! relName ) return;

    let baseItem = this.get(id)
    return super.populateRelated( baseItem, relateds, relName )
    .then( () => {
      return Promise.resolve( this.getRelated( id, relName ) );
    })
  }



}

export const CaseReducer = defaultReducer(CLASS_NAME);
export const CaseListReducer = defaultListReducer(LIST_NAME);
export const ChangesReducer = defaultListReducer(CHANGES);

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



