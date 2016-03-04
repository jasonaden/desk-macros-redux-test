import {createSelector} from 'reselect';
import {Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import {ICase, getCases} from '../desk-agent-case/states';

// SELECTED CASE
export const SET_SELECTED_CASE_ID = "SET_SELECTED_CASE_ID";
export function setSelectedCaseId(payload: number): Action<number> {
  return {
    type: SET_SELECTED_CASE_ID,
    payload
  }
}

const selectedCaseId:Reducer = (state:number = -1, action:Action<number>) => {
  switch (action.type) {
    case SET_SELECTED_CASE_ID:
      return action.payload;
    case SET_CASE_FILTER:
      return -1;
    default:
      return state;
  }
}
export const getSelectedCaseId = (state): number => state.deskAgentCaseList.selectedCaseId;
export const getSelectedCase: (state) => ICase = createSelector(getCases, getSelectedCaseId, selectedCaseFinder);
function selectedCaseFinder (cases: ICase[], selectedCaseId: number) {
  return cases.find(kase => kase.id == selectedCaseId);
}


// CASE FILTER
export const SET_CASE_FILTER = "SET_CASE_FILTER";
export function setCaseFilter(payload: string): Action<string> {
  return {
    type: SET_CASE_FILTER,
    payload
  }
}
const caseFilter:Reducer = (state:string = '', action:Action<string>):string => {
  switch (action.type) {
    case SET_CASE_FILTER:
      return action.payload;
    default:
      return state;
  }
}
export const getCaseFilter = (state): string => state.deskAgentCaseList.caseFilter;
export const getFilteredCases: (state) => ICase[] = createSelector(getCases, getCaseFilter, filteredCasesFinder);
function filteredCasesFinder (cases: ICase[], caseFilter: string) {
  return cases.filter(kase => kase.subject.toLowerCase().indexOf(caseFilter.toLowerCase()) > -1);
}


// EXPORT ALL REDUCERS
export const caseListReducers = combineReducers({
  selectedCaseId,
  caseFilter
});