import {Store} from '@ngrx/store';

// INTERFACES
import {ICase} from '../../desk-agent-case/states/interfaces';

// ACTIONS
import {setSelectedCase, setCaseFilter} from '../states/actions';

// SELECTORS
import {selectedCase, selectedCaseId, filteredCases} from '../states/selectors';

export class CaseList {
  store: Store<Object>;
  
  constructor (DeskStore) {
    this.store = DeskStore;
  }
  
  // CASE ITEMS
  get selectedCaseId () {
    return selectedCaseId(this.store.getState());
  }
  
  get selectedCase () {
    return selectedCase(this.store.getState());
  }
  
  get filteredCases () {
    return filteredCases(this.store.getState());
  }
  
  getCaseDisplay (kase: ICase) {
    return kase.subject;
  }

  onSelectCase (caseId:number) {
    this.store.dispatch(setSelectedCase(caseId));
  }
  
  // SHARED FILTER UPDATER
  onFilterChange (filter: string, selector: string) {
    return this.store.dispatch(setCaseFilter(filter));  
  }
  
};

export const CaseListComponent = {
  controller: CaseList,
	template: `
    <filter-list-selector title="Select a case">
      <filter>
        <filter-list-filter
          filter-change="$ctrl.onFilterChange(filter)"
          placeholder="Filter cases"></filter-list-filter>
      </filter>
      <list>
        <filter-list
          selected-id="$ctrl.selectedCaseId"
          list-items="$ctrl.filteredCases"
          select-item="$ctrl.onSelectCase(itemId)"
          item-name="$ctrl.getCaseDisplay(item)"></filter-list>
      </list>
    </filter-list-selector>
	`
}
