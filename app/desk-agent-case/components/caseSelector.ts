
import {Store} from '@ngrx/store';

export class CaseSelector {
  store: Store<Object>;

  constructor(DeskStore) {
    this.store = DeskStore;    
  }
};

export const CaseSelectorComponent = {
  controller: CaseSelector,
  bindings: {
    selectedCaseId: '<',
    filteredCases: '<',
    filterChange: '&',
    selectCase: '&'
  },
  template: `
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>Select a case</h3>
        <case-filter placeholder="Filter Cases" filter-change="$ctrl.filterChange({filter:filter})"></case-filter>
      </div>
      <div class="panel-body">
        <ul>
          <li ng-repeat="kase in $ctrl.filteredCases | limitTo:20" 
            ng-class="{active: kase.id==$ctrl.selectedCaseId}" 
            ng-click="$ctrl.selectCase({caseId:kase.id})">
              ({{kase.macros.length}}) -> {{kase.subject}}
          </li>
        </ul>
      </div>
    </div>
	`
}