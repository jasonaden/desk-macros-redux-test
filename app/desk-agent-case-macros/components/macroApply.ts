import {Store} from '@ngrx/store';
import {selectedCase} from '../../desk-agent-case/states/selectors';
import {selectedMacro} from '../states/selectors';
import {applyMacroToCase} from '../states/actions';


export class MacroApply {
  store: Store<Object>;
  
  constructor (AppStore) {
    this.store = AppStore;
  }
  
  get selectedCase () {
    return selectedCase(this.store.getState());
  }
  
  get selectedMacro () {
    return selectedMacro(this.store.getState());
  }
  
  applyMacro () {
    let caseId = this.selectedCase.id;
    let macroId = this.selectedMacro.id;
    this.store.dispatch(applyMacroToCase({caseId, macroId}))
  }
};

export const MacroApplyComponent = {
  controller: MacroApply,
  bindings: {
    
  },
  template:`
    <div class="row">
      <div class="col-md-3">
        Selected Case: {{($ctrl.selectedCase ? '(#'+$ctrl.selectedCase.id + ') - ' + $ctrl.selectedCase.subject : 'None Selected')}}
      </div>
      <div class="col-md-3">
        Selected Macro: {{($ctrl.selectedMacro ? $ctrl.selectedMacro.name : 'None Selected')}}
      </div>
      <div class="col-md-3">
        <input type="button" class='btn btn-primary' ng-click="$ctrl.applyMacro()" ng-disabled="!$ctrl.selectedCase || !$ctrl.selectedMacro" value="Apply Macro To Case"></input>
      </div>
    </div>
	`
}
