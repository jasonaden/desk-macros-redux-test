
import {createSelector} from 'reselect';
import {ICase} from '../..//desk-agent-case/states/interfaces';
import {cases} from '../../desk-agent-case/states/selectors';

// Simple selectors
export const caseFilter = (state): string => state.deskAgentCaseList.caseFilter;
export const selectedCaseId = (state): number => state.deskAgentCaseList.selectedCaseId;

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
