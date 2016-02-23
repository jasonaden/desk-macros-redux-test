import {Store} from '@ngrx/store';

// ACTIONS
import {setMacros, setSelectedMacro, setMacroFilter} from '../../desk-agent-case-macros/states/actions';
import {setCases} from '../../desk-agent-case/states/actions';

// SELECTORS
import {macros, selectedMacroId, filteredMacros} from '../../desk-agent-case-macros/states/selectors';
import {cases} from '../../desk-agent-case/states/selectors';

export class DeskAgent {
  store: Store<Object>;
  
  constructor (AppStore) {
    this.store = AppStore;
  };
  
  get selectedMacroId () {
    return selectedMacroId(this.store.getState());
  }
  
  get filteredMacros () {
    return filteredMacros(this.store.getState());
  }
  
  onSelectMacro (macroId:number) {
    this.store.dispatch(setSelectedMacro(macroId))
  }
  
  onFilterChange (filter: string) {
    this.store.dispatch(setMacroFilter(filter));
  }
  
}

export const DeskAgentComponent = {
  template: `
    <macro-apply></macro-apply>
    <hr/>
    <div class="row">
      <div class="col-md-3">
        <case-selector></case-selector>
      </div>
      <div class="col-md-3">
        <h2>You selected Case: Testing interaction Display</h2>
        <p> Please select your macro to apply</p>
        
      </div>
      <div class="col-md-3">
        <macro-selector 
          selected-macro-id="$ctrl.selectedMacroId"
          filtered-macros="$ctrl.filteredMacros" 
          select-macro="$ctrl.onSelectMacro(macroId)"
          filter-change="$ctrl.onFilterChange(filter)"></macro-selector>
      </div>
      <!-- <div class="col-md-3">
        <macro-folder-selector></macro-folder-selector>
      </div>
      -->
    </div>
	`,
  controller: DeskAgent
};