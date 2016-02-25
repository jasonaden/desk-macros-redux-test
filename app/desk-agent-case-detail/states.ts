import {createSelector} from 'reselect';
import {Reducer, Action, combineReducers} from '@ngrx/store';
import {ICase, getCases} from '../desk-agent-case/states';

// OPEN CASE
export const SET_OPEN_CASE = 'SET_OPEN_CASE';
export function setOpenCase(payload: Object): Action {
  return {
    type: SET_OPEN_CASE,
    payload
  }
}
export const openCase:Reducer<ICase> = (state:ICase = null, action) => {
  switch(action.type) {
    case SET_OPEN_CASE:
      return action.payload;
    default:
      return state;
  }
}
export const getOpenCase = (state):ICase => state.deskAgentCaseDetail.openCase;

export const caseDetailReducers = combineReducers({
  openCase
});
