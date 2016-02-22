
import {Store} from '@ngrx/store';
import {setMacroFilter} from '../states/actions';
import {filteredMacros} from '../states/selectors';

export class MacroSelector {
  store: Store<Object>;
  
  constructor(AppStore) {
    this.store = AppStore;
  }
  
  get filteredMacros () {
    return filteredMacros(this.store.getState());
  }
  
  onFilterChange (filter: string) {
    this.store.dispatch(setMacroFilter(filter));
  }
  
};

export const MacroSelectorComponent = {
  controller: MacroSelector,
  bindings: {
    macros: '<'
  },
  template: `
    <div class="panel panel-default">
      <div class="panel-heading">
        <macro-filter placeholder="Filter Macros" filter-change="$ctrl.onFilterChange(filter)"></macro-filter>
      </div>
      <div class="panel-body">
        <ul>
          <li ng-repeat="macro in $ctrl.filteredMacros">{{macro.name}}</li>
        </ul>
      </div>
    </div>
	`
}