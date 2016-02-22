
import {Reducer, Action, combineReducers} from '@ngrx/store';

import {
  SET_CASE_FILTER,
  SET_CASES
} from './actions';

const caseFilter:Reducer<string> = (state:string = '', action:Action) => {
  switch (action.type) {
    case SET_CASE_FILTER:
      return action.payload;
    default:
      return state;
  }
}

const cases:Reducer<Object[]> = (state:Object[] = [], action:Action) => {
  switch (action.type) {
		case SET_CASES:
			return action.payload.slice(0);
		default:
			return state;
	}
}

export const caseReducers = combineReducers({
  caseFilter,
  cases
})
