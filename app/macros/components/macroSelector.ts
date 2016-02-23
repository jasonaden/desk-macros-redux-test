
import {Store} from '@ngrx/store';
import {setMacroFilter, setSelectedMacro} from '../states/actions';
import {filteredMacros, selectedMacroId} from '../states/selectors';

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
  
  get selectedMacroId () {
    return selectedMacroId(this.store.getState());
  }
  
  setSelectedMacro (id: number) {
    this.store.dispatch(setSelectedMacro(id));
  }
  
};

export const MacroSelectorComponent = {
  controller: MacroSelector,
  template: `
    <div class="panel panel-default">
      <div class="panel-heading">
        <macro-filter placeholder="Filter Macros" filter-change="$ctrl.onFilterChange(filter)"></macro-filter>
      </div>
      <div class="panel-body">
        <ul>
          <li ng-repeat="macro in $ctrl.filteredMacros" ng-class="{active: macro.id==$ctrl.selectedMacroId}" ng-click="$ctrl.setSelectedMacro(macro.id)">{{macro.name}}</li>
        </ul>
      </div>
    </div>
	`
}
