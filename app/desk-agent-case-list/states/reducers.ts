
import {Reducer, Action, combineReducers} from '@ngrx/store';

import {
  SET_CASE_FILTER,
  SELECT_CASE
} from './actions';

import {ICase} from '../../desk-agent-case/states/interfaces';

const selectedCaseId:Reducer<number> = (state:number = -1, action:Action) => {
  switch (action.type) {
    case SELECT_CASE:
      return action.payload;
    case SET_CASE_FILTER:
      return -1;
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
export const caseListReducers = combineReducers({
  caseFilter,
  selectedCaseId
})
