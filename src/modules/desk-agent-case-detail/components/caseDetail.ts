import {Store} from 'redux';
import {stateGo} from 'redux-ui-router';
import * as Immutable from 'immutable';

import {getCaseById} from '../../desk/resources/case';
import {IMacro} from '../../desk-agent-case-macros/states';
import {
  getActiveCase, 
  getAppliedMacros, 
  canUpdate, 
  getSnapCase, 
  setEditCase, 
  setSnapCase
} from '../states';
import {getUsers} from '../../desk/resources/user';

const mapState = (state) => {
  return {
    appliedMacros: getAppliedMacros(state).toJS(),
    kase: getActiveCase(state).toJS(),
    canUpdate: canUpdate(state),
    users: getUsers(state).toJS()
  };
}

const mapDispatch = (dispatch) => {
  return {
    storeChanges: (kase) => {
      dispatch(setEditCase(Immutable.fromJS(kase)));
    },
    goBack: () => {
      dispatch(stateGo('desk.agent.case.list'));
    },
    goToCase: (id) => {
      dispatch(stateGo('desk.agent.case.detail', {id:id}));
    }
  };
}

let watchExit = null;

export class CaseDetailController {
  kase;
  autoSaveCallback;
  storeChanges;
  save;
  notes;
  user;
  labels;

  constructor ($scope, $ngRedux, CaseDetailService, Case) {
    // allow forms to keep redux in sync with UI    
    this.autoSaveCallback = () => this.storeChanges(this.kase); 

    // make local copy from case detail
    CaseDetailService.sync(this.autoSaveCallback);
    this.save = (kase) => {
      this.storeChanges(kase);
      return CaseDetailService.save();
    }
    
    // connect redux items to controller
    let unsubscribe = $ngRedux.connect(mapState, mapDispatch)(this);
    $scope.$on('$destroy', () => { unsubscribe(); });

    /** ************
     * TESTS to pull related items
     * 
     */
    Case.populateRelatedList(this.kase.id, 'notes')
    .then( () => {
      this.notes = Case.getRelatedList(this.kase.id, 'notes').toJS()
    })

    Case.populateRelated(this.kase.id, 'assigned_user')
    .then( () => {
      this.user = Case.getRelated( this.kase.id, 'assigned_user' ).toJS();
    })

    Case.populateRelatedList(this.kase.id, 'labels')
    .then( () => {
      this.labels = Case.getRelatedList(this.kase.id, 'labels').toJS()
    })

  }
};

export const CaseDetailComponent:ng.IComponentOptions = {
  controller: CaseDetailController,
	template: `
    <div class='well'>
      <button class='btn btn-primary' ng-click='$ctrl.goBack()'>Back to Case List</button>
      <button class='btn btn-primary' ng-click='$ctrl.storeChanges($ctrl.kase)'>Save Local</button>
      <input ng-model='$ctrl.goToCaseId'><button ng-click='$ctrl.goToCase($ctrl.goToCaseId)'>Go to Case</button>
      <h3>{{$ctrl.kase.subject}}</h3>
      <ng-form class='row' name='caseDetailForm' auto-save-form='$ctrl.autoSaveCallback'>
        <input class='col-md-12' type="text" ng-model="$ctrl.kase.subject">
        <div>
          <select ng-model='$ctrl.kase._links.assigned_user.href'>
            <option ng-repeat='user in $ctrl.users' value='{{::user._links.self.href}}'>{{::user.name}}</option>
          </select>
        </div>
      </ng-form>
      <span>Status: {{$ctrl.kase.status}}</span>
      <span>Type: {{$ctrl.kase.type}}</span>
      
      <div>
        <button class='btn btn-primary' ng-click='$ctrl.save($ctrl.kase)' ng-show="$ctrl.canUpdate">Save API</button>
      </div>
      <div>
        <h4>Applied Macros</h4>
        <span ng-if='!$ctrl.appliedMacros.length'>No macros</span>
        <ul ng-if='$ctrl.appliedMacros.length'>
          <li ng-repeat='macro in $ctrl.appliedMacros'>{{macro.name}}</li>
        </ul>
      </div>
      <div>
        <h4>Notes</h4>
        <span ng-if='!$ctrl.notes.length'>No Notes</span>
        <ul ng-if='$ctrl.notes.length'>
          <li ng-repeat='note in $ctrl.notes'>{{note.body}}</li>
        </ul>
      </div>
      <div>
        <h4>Labels</h4>
        <span ng-if='!$ctrl.labels.length'>No Labels</span>
        <ul ng-if='$ctrl.labels.length'>
          <li ng-repeat='label in $ctrl.labels'>{{label.name}}</li>
        </ul>
      </div>
      <div>
        <h4>Assigned User</h4>
        <span ng-if='!$ctrl.user'>No Assigned User</span>
        <span ng-if='$ctrl.user'>{{$ctrl.user.name}}</span>
      </div>
    </div>
    <macro-list></macro-list>
	`
}
