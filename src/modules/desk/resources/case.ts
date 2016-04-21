import {Action} from 'flux-standard-action';
import {Resource, defaultReducer} from '../../../resources';
import {caseSchema} from './config/schemas';

/**
 * Module name
 */
export const NAME = "CASE";

export interface ICase {
  id: number,
  subject: string,
  macros: Number[]
}

export interface ICases extends Map<String, any> {
  result: Number[];
  entities: {cases: Map<Number, ICase>};
  adding: boolean;
  loading: boolean;
}

export class Case extends Resource<ICase> {
  url = '/cases';
  public className = NAME;
  
  constructor(public $ngRedux, public $http, public $q, ApiV2Adapter) {
    super($ngRedux, $http, $q, ApiV2Adapter, caseSchema);
  }
  
}

export const kase = defaultReducer(NAME);


export const getCases = (state): ICase[] => {
  state = state.entities.case;
  return state.result.map(id => state.items[id]);
}

export const getCaseById = (state, id):ICase =>{
  return getCases(state).find(kase => kase.id==id);
}

export const APPLY_MACRO = 'APPLY_MACRO';
export const MACRO_APPLY_ERROR = 'MACRO_APPLY_ERROR';
export function applyMacro (payload: Object): Action<Object> {
  return {
    type: APPLY_MACRO, 
    payload
  };
}



