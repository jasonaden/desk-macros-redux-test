import {Store} from '@ngrx/store';
import {ICase} from '../../desk-agent-case/states';
import {getOpenCase} from '../states';

export class CaseDetailController {
  store: Store<Object>;
  constructor (DeskStore) {
    this.store = DeskStore;
  }
  
  get openCase ():ICase {
    return getOpenCase(this.store.getState());
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
        <span ng-if='!$ctrl.openCase.macros.length'>No macros</span>
        <ul ng-if='$ctrl.openCase.macros.length'>
          <li ng-repeat='macro in $ctrl.openCase.macros'>{{macro.name}}</li>
        </ul>
      </div>
    </div>
    <macro-list></macro-list>
	`
}
