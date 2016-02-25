import {Store} from '@ngrx/store';

// INTERFACES
import {IMacro} from '../states';

// ACTIONS
import {setSelectedMacro, setMacroFilter, getSelectedMacro, getSelectedMacroId, getFilteredMacros} from '../states';
import {getOpenCase} from '../../desk-agent-case-detail/states';
import {applyMacroToCase} from '../../desk-agent-case/states';

export class MacroList {
  store: Store<Object>;
  
  constructor (DeskStore) {
    this.store = DeskStore;
  }

  get openCase () {
    return getOpenCase(this.store.getState());
  }

  get selectedMacro () {
    return getSelectedMacro(this.store.getState());
  }
  
  get selectedMacroId () {
    return getSelectedMacroId(this.store.getState());
  }
  
  get filteredMacros () {
    return getFilteredMacros(this.store.getState());
  }
  
  getMacroDisplay (macro: IMacro) {
    return macro.name;
  }
  onSelectMacro (macroId:number) {
    this.store.dispatch(setSelectedMacro(macroId))
  }
  
  // SHARED FILTER UPDATER
  onFilterChange (filter: string, selector: string) {
    return this.store.dispatch(setMacroFilter(filter));
  }
  
  // MAIN VIEW ACTION
  applyMacro () {
    let macro = this.selectedMacro;
    this.store.dispatch(applyMacroToCase(macro));
  }
};

export const MacroListComponent = {
  controller: MacroList,
	template: `
    <filter-list-selector title="Select a macro">
      <filter>
        <filter-list-filter
          filter-change="$ctrl.onFilterChange(filter)"
          placeholder="Filter macros"></filter-list-filter>
      </filter>
      <list>
        <filter-list
          selected-id="$ctrl.selectedMacroId"
          list-items="$ctrl.filteredMacros"
          select-item="$ctrl.onSelectMacro(itemId)"
          item-name="$ctrl.getMacroDisplay(item)"></filter-list>
      </list>
    </filter-list-selector>
    <input ng-show='$ctrl.selectedMacro' type="button" class='btn btn-primary' ng-click="$ctrl.applyMacro()" value="Apply Macro To Case"></input>
	`
}
