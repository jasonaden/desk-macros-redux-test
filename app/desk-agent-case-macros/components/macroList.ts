import {Store} from '@ngrx/store';

// INTERFACES
import {IMacro} from '../states/interfaces';

// ACTIONS
import {setSelectedMacro, setMacroFilter} from '../states/actions';
import {applyMacroToCase, setSelectedCase, setCaseFilter} from '../../desk-agent-case/states/actions';

// SELECTORS
import {selectedCase} from '../../desk-agent-case-list/states/selectors';
import {selectedMacro, selectedMacroId, filteredMacros} from '../states/selectors';

export class MacroList {
  store: Store<Object>;
  
  constructor (DeskStore) {
    this.store = DeskStore;
  }

  get selectedCase () {
    return selectedCase(this.store.getState());
  }

  get selectedMacro () {
    return selectedMacro(this.store.getState());
  }
  
  get selectedMacroId () {
    return selectedMacroId(this.store.getState());
  }
  
  get filteredMacros () {
    return filteredMacros(this.store.getState());
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
    let caseId = this.selectedCase.id;
    let macro = this.selectedMacro;
    this.store.dispatch(applyMacroToCase({caseId, macro}))
  }
};

export const MacroListComponent = {
  controller: MacroList,
	template: `
    <div ng-if='$ctrl.selectedCase'>
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
    </div>
	`
}
