
import {Store} from '@ngrx/store';
import {setCaseFilter} from '../states/actions';
import {filteredCases} from '../states/selectors';

export class CaseSelector {
  store: Store<Object>;
  
  constructor(AppStore) {
    this.store = AppStore;
  }
  
  get filteredCases () {
    return filteredCases(this.store.getState());
  }
  
  onFilterChange (filter: string) {
    this.store.dispatch(setCaseFilter(filter));
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
          <li ng-repeat="kase in $ctrl.filteredCases">{{kase.subject}}</li>
        </ul>
      </div>
    </div>
	`
}