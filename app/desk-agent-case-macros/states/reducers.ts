
import {Reducer, Action, combineReducers} from '@ngrx/store';

import {
  SELECT_MACRO, 
  SET_MACRO_FILTER,
  ADD_MACRO_FILTER,
  SET_MACROS
} from './actions';

import { SET_CASE_FILTER } from '../../desk-agent-case/states/actions';

const selectedMacroId:Reducer<number> = (state:number = -1, action:Action) => {
  switch (action.type) {
    case SELECT_MACRO:
      return action.payload;
    case SET_MACRO_FILTER:
    case SET_CASE_FILTER:
      return -1;
    default:
      return state;
  }
}

const macroFilter:Reducer<string> = (state:string = '', action:Action) => {
  switch (action.type) {
    case SET_MACRO_FILTER:
      return action.payload;
    case SET_CASE_FILTER:
      return '';
    default:
      return state;
  }
}

const macros:Reducer<Object[]> = (state:Object[] = [], action:Action) => {
  switch (action.type) {
		case SET_MACROS:
			return action.payload.slice(0);
		default:
			return state;
	}
}

export const macroReducers = combineReducers({
  macroFilter,
  selectedMacroId,
  macros
})
