
import {Store} from '@ngrx/store';
import {setMacroFilter, setSelectedMacro} from '../states/actions';
import {filteredMacros, selectedMacroId} from '../states/selectors';

export class MacroSelector {
  store: Store<Object>;
  
  constructor(AppStore) {
    this.store = AppStore;
  }
  
};

export const MacroSelectorComponent = {
  controller: MacroSelector,
  bindings: {
    selectedMacroId: '<',
    filteredMacros: '<',
    filterChange: '&',
    selectMacro: '&'
  },
  template: `
    <div class="panel panel-default">
      <div class="panel-heading">
        <macro-filter placeholder="Filter Macros" filter-change="$ctrl.filterChange({filter: filter})"></macro-filter>
      </div>
      <div class="panel-body">
        <ul>
          <li ng-repeat="macro in $ctrl.filteredMacros" 
            ng-class="{active: macro.id==$ctrl.selectedMacroId}" 
            ng-click="$ctrl.selectMacro({macroId: macro.id})">
            {{macro.name}}
          </li>
        </ul>
      </div>
    </div>
	`
}
