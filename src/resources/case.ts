import {createSelector} from 'reselect';
import {Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';

import {Resource, IActions} from './resource';
import {ResourceAdapter} from './resource-adapter';

// ACTION TYPES
export const LOADING_CASES = "LOADING_CASES";
export const LOADED_CASES = "LOADED_CASES";
export const LOADING_CASE = "LOADING_CASE";
export const LOADED_CASE = "LOADED_CASE";
export const ADDING_CASE = "ADDING_CASE";
export const ADDED_CASE = "ADDED_CASE";
export const DELETING_CASE = "DELETING_CASE";
export const DELETED_CASE = "DELETED_CASE";
export const PATCHING_CASE = "PATCHING_CASE";
export const PATCHED_CASE = "PATCHED_CASE";

const LOAD_CASES = "LOAD_CASES";
const LOAD_CASE = "LOAD_CASE";
const ADD_CASE = "ADD_CASE";
const DELETE_CASE = "DELETE_CASE";
const PATCH_CASE = "PATCH_CASE";
const RELOAD_CASES = "RELOAD_CASES";
const RELOAD_CASE = "RELOAD_CASE";

const actions: IActions = {
  loadingMany: LOADING_CASES,
  loadedMany: LOADED_CASES,
  loadingOne: LOADING_CASE,
  loadedOne: LOADED_CASE,
  adding: ADDING_CASE,
  added: ADDED_CASE,
  deleting: DELETING_CASE,
  patching: PATCHING_CASE,
  patched: PATCHED_CASE,
  loadMany: LOAD_CASES,
  loadOne: LOAD_CASE,
  add: ADD_CASE,
  delete: DELETE_CASE,
  patch: PATCH_CASE,
  reloadMany: RELOAD_CASES,
  reloadOne: RELOAD_CASE
};

export interface ICase {
  id: number,
  subject: string,
  macros: Number[]
}

export interface ICases extends Map<String, any> {
  result: Number[];
  entities: {users: Map<Number, ICase>};
  adding: boolean;
  loading: boolean;
}

export class Case extends Resource<ICase> {
  url = '/cases';
  
  constructor($injector, ResourceAdapter: ResourceAdapter) {
    super($injector, ResourceAdapter, actions);
    
    // this._store.select<IUsers>('users');

  //   this.adding$ = store$.map(data => data.get('adding'));
  //   this.loading$ = store$.map(data => data.get('loading'));

  //   this.users$ = store$.map(data => {
  //     return data.get('result').reduce((acc, userId) => {
  //       acc.push(data.getIn(['entities', 'users', userId]));
  //       return acc;
  //     }, []);
  //   });
    
    
  // }
  
  // get data () {
  //   const state = this.state;
     
  }
  

  get state () {
    return this.store.getState().entities.cases;
  }
  
  // ADD METHODS TO GET DATA OUT OF THE RESOURCE.
  
}

// CASES
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
export const cases:Reducer = (state:ICase[] = [], action: Action<any>) => {
  switch (action.type) {
    case SET_CASES:
    case LOAD_CASES:
			return action.payload.slice(0).map(kase => {
        kase.macros = [];
        return kase;
      });
    case APPLY_MACRO:
      return state.map(kase => {
        if (kase.id !== action.payload.caseId) {
          return kase;
        }
        
        if (kase.macros.indexOf(action.payload.macroId) > -1) {
          return kase;
        }

        return Object.assign({}, kase,
          { macros: [...kase.macros, action.payload.macroId] });
      });
		default:
			return state;
	}
}

export const getCases = (state): ICase[] => {
  return state.entities.cases;
}

export const getCaseById = (state, id):ICase => getCases(state).find(kase => kase.id==id);
