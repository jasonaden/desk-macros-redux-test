import {Store} from 'redux';

import {ICase} from '../../desk-agent-case/states';
import {setSelectedCaseId, setCaseFilter, getSelectedCase, getSelectedCaseId, getFilteredCases} from '../states';

export class CaseList {
  store: Store;
  $state: {go: (string, {id: number}) => void};

  constructor ($state, DeskStore) {
    this.store = DeskStore;
    this.$state = $state;
  }
  
  // CASE ITEMS
  get selectedCaseId () {
    return getSelectedCaseId(this.store.getState());
  }
  
  get selectedCase () {
    return getSelectedCase(this.store.getState());
  }
  
  get filteredCases () {
    return getFilteredCases(this.store.getState());
  }
  
  getCaseDisplay (kase: ICase) {
    return kase.subject;
  }

  onSelectCase (caseId:number) {
    this.store.dispatch(setSelectedCaseId(caseId));
  }
  
  // SHARED FILTER UPDATER
  onFilterChange (filter: string, selector: string) {
    return this.store.dispatch(setCaseFilter(filter));  
  }
  
  goToCase (caseId: number) {
    return this.$state.go('desk.agent.caseDetail', {id: caseId});
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
    <input type="button" class="btn btn-primary" ng-show="$ctrl.selectedCaseId > -1" ng-click="$ctrl.goToCase($ctrl.selectedCaseId)" value="Go To Case"/>
	`
}
