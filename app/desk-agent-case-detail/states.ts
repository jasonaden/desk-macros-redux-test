import {createSelector} from 'reselect';
import {Reducer, Action, combineReducers} from '@ngrx/store';
import {ICase, getCases} from '../desk-agent-case/states';

// OPEN CASE
export const SET_OPEN_CASE_ID = 'SET_OPEN_CASE';
export function setOpenCaseId(payload: Object): Action {
  return {
    type: SET_OPEN_CASE_ID,
    payload
  }
}
export const openCaseId:Reducer<number> = (state:number = -1, action) => {
  switch(action.type) {
    case SET_OPEN_CASE_ID:
      return action.payload;
    default:
      return state;
  }
}
export const getOpenCaseId = (state):number => state.deskAgentCaseDetail.openCaseId;
export const getOpenCase: (state) => ICase = createSelector(getCases, getOpenCaseId, openCaseFinder);
function openCaseFinder(cases, caseId) {
  return cases.find(kase => kase.id == caseId);
}

export const caseDetailReducers = combineReducers({
  openCaseId
});
