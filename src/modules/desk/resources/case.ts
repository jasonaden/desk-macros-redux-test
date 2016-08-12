import {Action} from 'flux-standard-action';
import * as Immutable from 'immutable';

import {Resource, defaultReducer, defaultListReducer} from 'restore';
import {caseSchema} from './config/schemas';
import {ApiV2Adapter} from './config/apiv2-adapter';

/**
 * Module name
 */
export const NAME = "CASE";
const LIST = "CASELIST";

export interface ICase {
  id: number,
  subject: string,
  adapter: any,
  macros: Number[]
}

export class Case extends Resource<ICase> {
  public url = '/cases';
  public className = NAME;
  
  private defaultConfig;

  constructor(public $ngRedux, ApiV2Adapter) {
    super($ngRedux, ApiV2Adapter);

    this.defaultConfig = {
      url: this.url
    }
  }

  getDefaultConfig (id, config) {
    return {
      url: this.url + '/' + id,
      className: this.className 
    };
  }

  beforeFindOne(id, config = {}) {
    return this.getDefaultConfig(id, config);
  }

  beforeFind(config = {}) {
    config.params = Object.assign({}, {url:this.url}, config.params)
    config.listName = LIST;
    return config;
  }

  
}

export const CaseReducer = defaultReducer(NAME);
export const CaseListReducer = defaultListReducer(LIST);

export const getAllCases = (state) => {
  let entities = state.entities.case;
  return entities.items.toList();
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



