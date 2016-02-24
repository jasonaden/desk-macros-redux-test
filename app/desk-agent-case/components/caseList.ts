import {Store} from '@ngrx/store';

// INTERFACES
import {ICase} from '../states/interfaces';
import {IMacro} from '../../desk-agent-case-macros/states/interfaces';

// ACTIONS
import {setSelectedMacro, setMacroFilter} from '../../desk-agent-case-macros/states/actions';
import {applyMacroToCase, setSelectedCase, setCaseFilter} from '../states/actions';

// SELECTORS
import {selectedCase, selectedCaseId, filteredCases} from '../states/selectors';
import {selectedMacro, selectedMacroId, filteredMacros} from '../../desk-agent-case-macros/states/selectors';

export class CaseList {
  store: Store<Object>;
  
  constructor (DeskStore) {
    this.store = DeskStore;
  }
  
  // CASE ITEMS
  get selectedCaseId () {
    return selectedCaseId(this.store.getState());
  }
  
  get selectedCase () {
    return selectedCase(this.store.getState());
  }
  
  get filteredCases () {
    return filteredCases(this.store.getState());
  }
  
  getCaseDisplay (kase: ICase) {
    return '(' + kase.macros.length + ' macros): ' + kase.subject;
  }

  onSelectCase (caseId:number) {
    this.store.dispatch(setSelectedCase(caseId));
  }
  
  // MACRO ITEMS
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
    switch (selector) {
      case 'macro':
        return this.store.dispatch(setMacroFilter(filter));
      case 'case':
        return this.store.dispatch(setCaseFilter(filter));  
    }
  }
  
  // MAIN VIEW ACTION
  applyMacro () {
    let caseId = this.selectedCase.id;
    let macroId = this.selectedMacro.id;
    this.store.dispatch(applyMacroToCase({caseId, macroId}))
  }
};

export const CaseListComponent = {
  controller: CaseList,
	template: `
    <div class="row">
      <div class="col-md-3">
        <filter-list-selector title="Select a case">
          <filter-list-filter
            filter-change="$ctrl.onFilterChange(filter, 'case')"
            placeholder="Filter cases"></filter-list-filter>
          <filter-list
            selected-id="$ctrl.selectedCaseId"
            list-items="$ctrl.filteredCases"
            select-item="$ctrl.onSelectCase(itemId)"
            item-name="$ctrl.getCaseDisplay(item)"></filter-list>
        </filter-list-selector>
      </div>
      <div class="col-md-3" ng-show='$ctrl.selectedCase'>
        <filter-list-selector title="Select a macro">
          <filter-list-filter
            filter-change="$ctrl.onFilterChange(filter, 'macro')"
            placeholder="Filter macros"></filter-list-filter>
          <filter-list
            selected-id="$ctrl.selectedMacroId"
            list-items="$ctrl.filteredMacros"
            select-item="$ctrl.onSelectMacro(itemId)"
            item-name="$ctrl.getMacroDisplay(item)"></filter-list>
        </filter-list-selector>
      </div>
      <div class="col-md-3" ng-show='$ctrl.selectedCase && $ctrl.selectedMacro'>
          <input type="button" class='btn btn-primary' ng-click="$ctrl.applyMacro()" value="Apply Macro To Case"></input>
        </p>
      </div>
    </div>
	`
}
