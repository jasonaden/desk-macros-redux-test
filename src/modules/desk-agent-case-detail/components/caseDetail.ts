import {Store} from 'redux';
import {stateGo} from 'redux-ui-router';
import * as Immutable from 'immutable';

//import {RxPoller} from '../../desk/services/RxPoller'
//import {Case} from '../../desk/resources/case';

import {getCaseById} from '../../desk/resources/case';
import {IMacro} from '../../desk-agent-case-macros/states';
import {getActiveCase, getAppliedMacros, updateCase} from '../states';

const mapState = (state) => {
  return {
    appliedMacros: getAppliedMacros(state).toJS()
  };
}

const mapDispatch = (dispatch) => {
  return {
    saveChanges: (kase) => {
      dispatch(updateCase(Immutable.fromJS(kase)));
    },
    goBack: () => {
      dispatch(stateGo('desk.agent.case.list'));
    }
  };
}

let watchExit = null;

export class CaseDetailController {
  kase;
  Case;

  constructor ($rootScope, $q, $scope, $ngRedux, RxPoller, Case) {
    
    // save changes to editCase when the poller kicks off
    // and refresh our local copy when loading completes
    $scope.$watch(() => Case.store.getState().entities.case.loadingOne, (loading) => {
      if (loading) {
        this.saveChanges(this.kase);
      } else {
        this.kase = getActiveCase($ngRedux.getState()).toJS();
      }
    });

    // make local copy from case detail
    this.kase = getActiveCase($ngRedux.getState()).toJS();

    // connect redux items to controller
    let unsubscribe = $ngRedux.connect(mapState, mapDispatch)(this);
    
    // save unsaved changes when navigating away
    watchExit = $rootScope.$on('$stateChangeStart', (event) => {
      this.saveChanges(this.kase);
    });

    // poll case
    let poller = new RxPoller('case', { interval:20000 })
      .setAction(() => Case.findOne(this.kase.id))
      .start();

    $scope.$on('$destroy', () => {
      unsubscribe();
      watchExit();
    });   
  }

};


export const CaseDetailComponent:ng.IComponentOptions = {
  controller: CaseDetailController,
  bindings: {
    resolvedCase: '<'
  },
	template: `
    <div class='well'>
      <button class='btn btn-primary' ng-click='$ctrl.goBack()'>Back to Case List</button>
      <button class='btn btn-primary' ng-click='$ctrl.saveChanges($ctrl.kase)'>Save Local</button>
      <h3>{{$ctrl.kase.subject}}</h3>
      <div class='row'>
        <input class='col-md-12' type="text" ng-model="$ctrl.kase.subject">
      </div>
      <span>Status: {{$ctrl.kase.status}}</span>
      <span>Type: {{$ctrl.kase.type}}</span>
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
