
import {Reducer, Action, combineReducers} from '@ngrx/store';

import {
  SET_CASE_FILTER,
  SET_CASES,
  SELECT_CASE
} from './actions';

import {ICase} from './interfaces';
import { APPLY_MACRO_TO_CASE } from '../../desk-agent-case-macros/states/actions';

const selectedCaseId:Reducer<number> = (state:number = -1, action:Action) => {
  switch (action.type) {
    case SELECT_CASE:
      return action.payload;
    default:
      return state;
  }
}

const caseFilter:Reducer<string> = (state:string = '', action:Action) => {
  switch (action.type) {
    case SET_CASE_FILTER:
      return action.payload;
    default:
      return state;
  }
}

const cases:Reducer<ICase[]> = (state:ICase[] = [], action:Action) => {
  switch (action.type) {
		case SET_CASES:
			return action.payload.slice(0).map(kase => {
        kase.macros = [];
        return kase;
      });
    case APPLY_MACRO_TO_CASE:
      return state.map(kase => {
        if (kase.id !== action.payload.caseId) {
          return kase;
        }
        
        if (kase.macros.indexOf(action.payload.macroId) > -1) {
          return kase;
        }

        return Object.assign({}, kase,
          { macros: [...kase.macros, action.payload.macroId] }
        );
      });
		default:
			return state;
	}
}

export const caseReducers = combineReducers({
  caseFilter,
  cases,
  selectedCaseId
})
