import {Action} from 'flux-standard-action';
import * as Immutable from 'immutable';

import {Resource, defaultReducer} from 'restore';
import {caseSchema} from './config/schemas';
import {ApiV2Adapter} from './config/apiv2-adapter';

/**
 * Module name
 */
export const NAME = "CASE";

export interface ICase {
  id: number,
  subject: string,
  adapter: any,
  macros: Number[]
}

export class Case extends Resource<ICase> {
  public url = '/cases';
  public className = NAME;
  
  private defaultParams;

  constructor(public $ngRedux, ApiV2Adapter) {
    super($ngRedux, ApiV2Adapter, caseSchema);

    this.defaultConfig = {
      url: this.url,
      baseUrl: this.adapter.baseUrl
    }
  }

  getDefaultConfig (id, config) {
    return {
      url: this.url + '/' + id,
      baseUrl: this.adapter.baseUrl,
      className: this.className 
    };
  }

  beforeFindOne(id, config = {}) {
    return Promise.all([this.getDefaultConfig(id, config)]);
  }

  
}

export const CaseReducer = defaultReducer(NAME);


export const getCases = (state) => {
  let entities = state.entities.case;
  return entities.items.toList();
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



