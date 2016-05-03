import {Store} from 'redux';
import {stateGo} from 'redux-ui-router';
import * as Immutable from 'immutable';
import * as diff from 'immutablediff';
import * as patch from 'immutablepatch';

import {getCaseById} from '../../desk/resources/case';
import {IMacro} from '../../desk-agent-case-macros/states';
import {getActiveCase, getAppliedMacros, getSnapCase, setEditCase, setSnapCase} from '../states';

const mapState = (state) => {
  return {
    appliedMacros: getAppliedMacros(state).toJS()
  };
}

const mapDispatch = (dispatch) => {
  return {
    storeChanges: (kase) => {
      dispatch(setEditCase(Immutable.fromJS(kase)));
    },
    setEditCase: (kase) => {
      dispatch(setEditCase(kase));
    },
    setSnapCase: (kase) => {
      dispatch(setSnapCase(kase));
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
  storeChanges;
  setEditCase;
  setSnapCase;

  constructor ($rootScope, $q, $scope, $ngRedux, RxPoller, Case) {
    
    // save changes to editCase when the poller kicks off
    // and refresh our local copy when loading completes
    $scope.$watch(() => Case.store.getState().entities.case.loadingOne, (loading, prevLoading) => {

      if (!loading && prevLoading) {
        // push local changes into editCase
        this.storeChanges(this.kase);
        
        // get state after stashing local changes
        const state = $ngRedux.getState();
        
        // snapshot of case where we initially forked for editing
        const snapCase = getSnapCase(state);
        // un-"saved" edited version of case
        const editCase = getActiveCase(state);
        // externally changed version of case
        const entityCase = getCaseById(state, this.kase.id);
        
        // how external changes differ from our fork point
        const remoteChanges = diff(snapCase, entityCase);
        // nothing to do if there are no remote changes
        if (remoteChanges.count() == 0) { return;  }
        
        // how our local changes differ from our fork point 
        const localChanges = diff(snapCase, editCase);
        // if there are no local changes, accept remote as snap and edit version
        if (localChanges.count() == 0) {
          this.setEditCase(entityCase);
          this.setSnapCase(entityCase);
          // update case on scope
          this.kase = entityCase.toJS();
          return;
        }
        
        // merged set of changes with local changes at the end
        const changes = remoteChanges.concat(localChanges);
       
        // updated case which merges remote and local changes,
        // giving preference to our local changes
        const mergedCase = patch(editCase, changes);
        
        // update store's edited case with the merge
        this.setEditCase(mergedCase);      
        // update store's snapshot to the new remote version
        this.setSnapCase(entityCase);

        // update case on scope
        this.kase = mergedCase.toJS();
      }
    });

    // make local copy from case detail
    this.kase = getActiveCase($ngRedux.getState()).toJS();

    // connect redux items to controller
    let unsubscribe = $ngRedux.connect(mapState, mapDispatch)(this);
    
    // save unsaved changes when navigating away
    watchExit = $rootScope.$on('$stateChangeStart', (event) => {
      this.storeChanges(this.kase);
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
      <button class='btn btn-primary' ng-click='$ctrl.storeChanges($ctrl.kase)'>Save Local</button>
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
