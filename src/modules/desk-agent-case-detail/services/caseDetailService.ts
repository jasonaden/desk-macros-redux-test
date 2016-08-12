import * as Immutable from 'immutable';
import * as diff from 'immutablediff';
import * as patch from 'immutablepatch';
import {stateGo} from 'redux-ui-router';
import {getActiveCaseId, getActiveCase, getSnapCase, setCanUpdate, setEditCase, setSnapCase} from '../states';
import {RxPoller} from 'rx-poller';
import {getCaseById} from '../../desk/resources/case';

export interface ICaseDetailService {
  sync(): any;
}

const mapDispatch = (dispatch) => {
  return {
    setEditCase: (kase) => {
      dispatch(setEditCase(kase));
    },
    setSnapCase: (kase) => {
      dispatch(setSnapCase(kase));
    },
    goBack: () => {
      dispatch(stateGo('desk.agent.case.list'));
    },
    goToCase: (id) => {
      dispatch(stateGo('desk.agent.case.detail', {id:id}));
    }
  };
}

export class CaseDetailService implements ICaseDetailService {
  activeCaseId;
  Case;
  rootScope: ng.IRootScopeService;
  ngRedux;
  RxPoller;
  caseDetailPoller;
  setEditCase;
  setSnapCase;
  ReduxWatch;

  static $inject = ['$rootScope', '$ngRedux', 'RxPoller', 'ReduxWatch', 'Case'];
  constructor ($rootScope, $ngRedux, RxPoller, ReduxWatch, Case) {
    this.rootScope = $rootScope;
    this.ngRedux = $ngRedux;
    this.RxPoller = RxPoller;
    this.Case = Case;
    this.ReduxWatch = ReduxWatch;
    $ngRedux.connect(null, mapDispatch)(this);
  }

  save(kase) {
    const editCase = getActiveCase(this.ngRedux.getState());
    const snapCase = getSnapCase(this.ngRedux.getState());
    const delta = diff(snapCase, editCase); 

    let patch = {};
    let path;
    delta.forEach((d) => {
      path = d.get('path');
      path = path.replace('/','');
      patch[path] = d.get('value');
    });
    this.Case.update(kase.id, patch);
  }
  
  unsync () {
    this.ReduxWatch.unwatch('activeCase');
    this.caseDetailPoller.stop();
  }
  sync (stashFn) {
    this.activeCaseId = getActiveCaseId(this.ngRedux.getState());
    // save unsaved changes when navigating away
    let watchExit = this.rootScope.$on('$stateChangeStart', (event) => {
      stashFn();
      this.unsync();
    });

    // poll case
    this.caseDetailPoller = RxPoller.getPoller('case') || new RxPoller('case', { interval:20000 });
    this.caseDetailPoller.setAction(() => this.Case.findOne(this.activeCaseId));
    this.caseDetailPoller.start();

    // watch for changes to entity
    // these most likely come from poller,
    // but we will be open to any source of change
    this.ReduxWatch.watch('activeCase', 
    // selector
    () => {
      return getCaseById(this.ngRedux.getState(), this.activeCaseId);
    }, 
    // comparator
    (a, b) => {
    return Immutable.is(a,b);
    }, 
    // diff callback
    () => {
      // get state after stashing local changes
      const state = this.ngRedux.getState();
      
      // snapshot of case where we initially forked for editing
      const snapCase = getSnapCase(state);
      // externally changed version of case
      const entityCase = getCaseById(state, this.activeCaseId);
      
      // how external changes differ from our fork point
      const remoteChanges = diff(snapCase, entityCase);
      // nothing to do if there are no remote changes
      if (remoteChanges.count() == 0) { return;  }

      // push local changes into editCase
      stashFn()
      // un-"saved" edited version of case
      const editCase = getActiveCase(state);      
      // how our local changes differ from our fork point 
      const localChanges = diff(snapCase, editCase);
      // if there are no local changes, accept remote as snap and edit version
      if (localChanges.count() == 0) {
        this.setEditCase(entityCase);
        this.setSnapCase(entityCase);
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
    });
  }
}