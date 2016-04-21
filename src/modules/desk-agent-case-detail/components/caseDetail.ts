import {Store} from 'redux';
import {ICase, getCaseById} from '../..//desk/resources/case';
import {IMacro} from '../../desk-agent-case-macros/states';
import {getOpenCase, getAppliedMacros, getSelectedMacroId} from '../states';

const mapStateToThis = (state) => {
  return {
    openCase: getOpenCase(state),
    selectedMacroId: getSelectedMacroId(state),
    appliedMacros: getAppliedMacros(state)
  };
}

export class CaseDetailController {
  openCase = null;
  
  constructor ($scope, $ngRedux) {
    let unsubscribe = $ngRedux.connect(mapStateToThis)(this);
    $scope.$on('$destroy', unsubscribe);   
  }
};


export const CaseDetailComponent:ng.IComponentOptions = {
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
        <span ng-if='!$ctrl.appliedMacros.length'>No macros</span>
        <ul ng-if='$ctrl.appliedMacros.length'>
          <li ng-repeat='macro in $ctrl.appliedMacros'>{{macro.name}}</li>
        </ul>
      </div>
    </div>
    <macro-list></macro-list>
	`
}
