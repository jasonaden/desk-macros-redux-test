
import {createSelector} from 'reselect';
import {ICase} from './interfaces';

// Simple selectors
export const cases = (state): ICase[] => state.deskAgentCase.cases;
export const caseFilter = (state): string => state.deskAgentCase.caseFilter;
export const selectedCaseId = (state): number => state.deskAgentCase.selectedCaseId;

// Composed selectors
export const filteredCases: (state) => ICase[] = createSelector(cases, caseFilter, filterCases);
export const selectedCase: (state) => ICase = createSelector(cases, selectedCaseId, getSelectedCase);

// Helper functions
function filterCases (cases: ICase[], caseFilter: string) { 
  return cases.filter(kase => kase.subject.toLowerCase().indexOf(caseFilter.toLowerCase()) > -1);
}

function getSelectedCase (cases: ICase[], selectedCaseId: number) {
  return cases.find(kase => kase.id == selectedCaseId);
}
