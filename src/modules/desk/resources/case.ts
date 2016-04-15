import {Action} from 'flux-standard-action';
import {normalize, Schema, arrayOf} from 'normalizr';

import {Resource, IEntityState} from '../../../resources';

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
  
  constructor($injector, ApiV2Adapter) {
    super($injector, ApiV2Adapter, caseSchema);
  }
  
}

export const kase = Case.reducer(NAME);
















export const getCases = (state): ICase[] => {
  state = state.entities.case;
  return state.result.map(id => state.items[id]);
}





export const getCaseById = (state, id):ICase => getCases(state).find(kase => kase.id==id);

export const SET_CASES = "SET_CASES";
export function setCases(payload: Object[]): Action<Object[]> {
  return {
    type: SET_CASES,
    payload
  }
};

export const APPLY_MACRO = 'APPLY_MACRO';
export const MACRO_APPLY_ERROR = 'MACRO_APPLY_ERROR';
export function applyMacro (payload: Object): Action<Object> {
  return {
    type: APPLY_MACRO, 
    payload
  };
}




// ACTION TYPES
// export const LOADING_CASES = "LOADING_CASES";
// export const LOADED_CASES = "LOADED_CASES";
// export const LOADING_CASE = "LOADING_CASE";
// export const LOADED_CASE = "LOADED_CASE";
// export const ADDING_CASE = "ADDING_CASE";
// export const ADDED_CASE = "ADDED_CASE";
// export const DELETING_CASE = "DELETING_CASE";
// export const DELETED_CASE = "DELETED_CASE";
// export const PATCHING_CASE = "PATCHING_CASE";
// export const PATCHED_CASE = "PATCHED_CASE";

// const LOAD_CASES = "LOAD_CASES";
// const LOAD_CASE = "LOAD_CASE";
// const ADD_CASE = "ADD_CASE";
// const DELETE_CASE = "DELETE_CASE";
// const PATCH_CASE = "PATCH_CASE";
// const RELOAD_CASES = "RELOAD_CASES";
// const RELOAD_CASE = "RELOAD_CASE";

// const actions: IActions = {
//   loadingMany: LOADING_CASES,
//   loadedMany: LOADED_CASES,
//   loadingOne: LOADING_CASE,
//   loadedOne: LOADED_CASE,
//   adding: ADDING_CASE,
//   added: ADDED_CASE,
//   deleting: DELETING_CASE,
//   patching: PATCHING_CASE,
//   patched: PATCHED_CASE,
//   loadMany: LOAD_CASES,
//   loadOne: LOAD_CASE,
//   add: ADD_CASE,
//   delete: DELETE_CASE,
//   patch: PATCH_CASE,
//   reloadMany: RELOAD_CASES,
//   reloadOne: RELOAD_CASE
// };
