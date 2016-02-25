import {Store} from '@ngrx/store';

// INTERFACES
import {IMacro} from '../states';

// ACTIONS
import {setSelectedMacroId, setMacroFilter, getSelectedMacro, getSelectedMacroId, getFilteredMacros} from '../states';
import {getOpenCaseId} from '../../desk-agent-case-detail/states';
import {applyMacroToCase} from '../../desk-agent-case/states';

export class MacroList {
  store: Store<Object>;
  
  constructor (DeskStore) {
    this.store = DeskStore;
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
    this.store.dispatch(setSelectedMacroId(macroId))
  }
  
  // SHARED FILTER UPDATER
  onFilterChange (filter: string, selector: string) {
    return this.store.dispatch(setMacroFilter(filter));
  }
  
  get openCaseId () {
    return getOpenCaseId(this.store.getState());
  }
  
  // MAIN VIEW ACTION
  applyMacro (caseId, macroId) {
    return this.store.dispatch(applyMacroToCase({caseId:caseId, macroId:macroId}));
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
    <input ng-show='$ctrl.selectedMacro' type="button" class='btn btn-primary' ng-click="$ctrl.applyMacro($ctrl.openCaseId, $ctrl.selectedMacroId)" value="Apply Macro To Case"></input>
	`
}
