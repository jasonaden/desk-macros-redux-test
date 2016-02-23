
import {Store} from '@ngrx/store';
import {setCaseFilter, setSelectedCase} from '../states/actions';
import {filteredCases, selectedCaseId} from '../states/selectors';

export class CaseSelector {
  store: Store<Object>;

  constructor(AppStore) {
    this.store = AppStore;    
  }
  
  get filteredCases (){
    return filteredCases(this.store.getState());
  }
  
  onFilterChange (filter: string) {
    this.store.dispatch(setCaseFilter(filter));
    
    // what if changing the filter hides selected macro? (same comments as on macro filter)
    // is this really where we need to put this kind of logic?
    // would it make more sense to just clear it here, without checking visibility?
    if (!this.filteredCases.find(macro => macro.id == this.selectedCaseId)) {
      this.setSelectedCase(-1);
    }
  }
  
  get selectedCaseId () {
    return selectedCaseId(this.store.getState());
  }
  
  setSelectedCase (id: number) {
    this.store.dispatch(setSelectedCase(id));
  }
};

export const CaseSelectorComponent = {
  controller: CaseSelector,
  bindings: {
    cases: '<'
  },
  template: `
    <div class="panel panel-default">
      <div class="panel-heading">
        <case-filter placeholder="Filter Cases" filter-change="$ctrl.onFilterChange(filter)"></case-filter>
      </div>
      <div class="panel-body">
        <ul>
          <li ng-repeat="kase in $ctrl.filteredCases | limitTo:20" ng-class="{active: kase.id==$ctrl.selectedCaseId}" ng-click="$ctrl.setSelectedCase(kase.id)">({{kase.macros.length}}) -> {{kase.subject}}</li>
        </ul>
      </div>
    </div>
	`
}