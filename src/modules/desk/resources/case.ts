import {Action} from 'flux-standard-action';
import * as Immutable from 'immutable';

import {Resource, defaultReducer, defaultListReducer} from 'restore';
import {caseSchema} from './config/schemas';
import {ApiV2Adapter} from './config/apiv2-adapter';

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

export class Case extends Resource<ICase> {
  public url = '/cases';
  public className = CLASS_NAME;
  
  constructor(public $ngRedux, ApiV2Adapter) {
    super($ngRedux, ApiV2Adapter);
  }

  beforeAdd(payload, persistorConfig = {}, adapterConfig = {}) {
    persistorConfig.url = this.url;
    persistorConfig.data = payload;
    return [persistorConfig, adapterConfig];
  }

  beforeFindOne(id, persistorConfig = {}) {
    persistorConfig.url = this.url + '/' + id;
    return [persistorConfig];
  }

  beforeUpdate(id, patch, persistorConfig = {}, adapterConfig = {}) {
    persistorConfig.url = this.url + '/' + id;
    persistorConfig.data = patch;
    return [persistorConfig, adapterConfig];
  }

  beforeDestroy(id, persistorConfig = {}, adapterConfig = {}) {
    persistorConfig.url = this.url + '/' + id;
    return [persistorConfig, adapterConfig];
  }

  list(persistorConfig = {}, adapterConfig = {}) {
    adapterConfig.listName = LIST_NAME;
    persistorConfig = Object.assign({}, {url:this.url}, persistorConfig)
    return this.find(persistorConfig, adapterConfig);
  }

  changes(persistorConfig = {}, adapterConfig = {}) {
    adapterConfig.listName = CHANGES;
    persistorConfig = Object.assign({}, {url:'filters/11/cases/changes?cflpt=1471022097&cids=&embed=customer&filter_id=11&page=1&per_page=50&sort_direction=desc&sort_field=updated_at'}, persistorConfig)
    return this.find(persistorConfig, adapterConfig);
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



