
import {ICase} from '../../desk-agent-case/states';
import {IMacro, getMacrosFromOpenCase} from '../../desk-agent-case-macros/states';
import {getOpenCase} from '../states';

const mapStateToThis = (state) => {
  return {
    openCase: getOpenCase(state),
    caseMacros: getMacrosFromOpenCase(state)
  };
}

export class CaseDetailController {
  constructor ($scope, $ngRedux) {
    let unsubscribe = $ngRedux.connect(mapStateToThis)(this);
    $scope.$on('$destroy', unsubscribe);
  }
};


export const CaseDetailComponent = {
  controller: CaseDetailController,
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
