
import {createSelector} from 'reselect';

// Interfaces
interface ICase {
  subject: string,
  macros: String[]
}

// Simple selectors
export const cases = (state): ICase[] => state.caseReducers.cases;
export const caseFilter = (state): string => state.caseReducers.caseFilter;

export const filteredCases: (state) => ICase[] = createSelector(cases, caseFilter, filterCases);

// Helper functions
function filterCases (cases: ICase[], caseFilter: string) { 
  return cases.filter(kase => kase.subject.toLowerCase().indexOf(caseFilter.toLowerCase()) > -1);
}

