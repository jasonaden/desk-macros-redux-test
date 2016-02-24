import {Store} from '@ngrx/store';

// SELECTORS
import {selectedCase} from '../../desk-agent-case-list/states/selectors';

export class CaseDetailController {
  store: Store<Object>;
  
  constructor (DeskStore) {
    this.store = DeskStore;
  }

  get selectedCase () {
    return selectedCase(this.store.getState());
  }
};

export const CaseDetailComponent = {
  controller: CaseDetailController,
	template: `
    <div ng-if='$ctrl.selectedCase' class='well'>
      <h3>{{$ctrl.selectedCase.subject}}</h3>
      <span>Status: {{$ctrl.selectedCase.status}}</span>
      <span>Type: {{$ctrl.selectedCase.type}}</span>
      <div ng-if='$ctrl.selectedCase.macros.length'>
        <h4>Applied Macros</h4>
        <ul>
          <li ng-repeat='macro in $ctrl.selectedCase.macros'>{{macro.name}}</li>
        </ul>
      </div>
    </div>
    <macro-list></macro-list>
	`
}
