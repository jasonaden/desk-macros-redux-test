import {Store} from '@ngrx/store';
import {ICase} from '../../desk-agent-case/states';
import {IMacro, getMacrosFromOpenCase} from '../../desk-agent-case-macros/states';
import {getOpenCase} from '../states';

export class CaseDetailController {
  store: Store<Object>;
  constructor (DeskStore) {
    this.store = DeskStore;
  }
  
  get openCase ():ICase {
    return getOpenCase(this.store.getState());
  }

  get caseMacros ():IMacro[] {
    return getMacrosFromOpenCase(this.store.getState());
  }

};


export const CaseDetailComponent = {
  controller: CaseDetailController,
  bindings: {
    resolvedCase: '<'
  },
	template: `
    <div class='well'>
      <h3>{{$ctrl.openCase.subject}}</h3>
      <span>Status: {{$ctrl.openCase.status}}</span>
      <span>Type: {{$ctrl.openCase.type}}</span>
      <div>
        <h4>Applied Macros</h4>
        <span ng-if='!$ctrl.caseMacros.length'>No macros</span>
        <ul ng-if='$ctrl.caseMacros.length'>
          <li ng-repeat='macro in $ctrl.caseMacros'>{{macro.name}}</li>
        </ul>
      </div>
    </div>
    <macro-list></macro-list>
	`
}
