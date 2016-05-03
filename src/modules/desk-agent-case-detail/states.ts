import {createSelector} from 'reselect';
import {Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import {take, put, call, fork, cancel} from 'redux-saga/effects';
import * as Immutable from 'immutable';
import * as diff from 'immutablediff';
import * as patch from 'immutablepatch';

import {FIND_ONE} from '../../resources/constants';
import {Case} from '../desk/resources/case';
import {setMacroApplyError} from '../desk-agent-case-macros/states';

export const CaseDetails = Immutable.Record({
  activeCaseId: -1,
  cases: Immutable.Map()
});

export const CaseDetail = Immutable.Record({
  snapCase: null,
  editCase: null,
  isDirty: false,
  canUpdate: false,
  canSend: false,
  appliedMacros: Immutable.Set(),
  actions: Immutable.List()
});

export const SET_ACTIVE_CASE_ID = 'SET_ACTIVE_CASE_ID';
export const SET_CASE_DETAIL = 'SET_CASE_DETAIL';
export const SET_SELECTED_MACRO = 'SET_SELECTED_MACRO';
export const APPLY_MACRO = 'APPLY_MACRO';
export const APPLY_MACRO_TO_CASE = 'APPLY_MACRO_TO_CASE';
export const UPDATE_CASE = 'UPDATE_CASE';

export const caseStore:Reducer = (state = new CaseDetails(), action:Action<any>) => {
  switch(action.type) {
    case SET_CASE_DETAIL:
      return state.mergeIn(['cases', action.payload.caseId], action.payload.detail);
    case SET_ACTIVE_CASE_ID:
      return state.set('activeCaseId', action.payload);
    case UPDATE_CASE:
      return state.mergeIn(['cases', action.payload.get('id'), 'editCase'], action.payload);
    case FIND_ONE + '_CASE':
      if ( state.activeCaseId == action.payload.id ) {
        // snapshot of case where we initially forked for editing
        const snapCase = state.cases.get(state.activeCaseId).get('snapCase');
        // unsaved edited version of case
        const editCase = state.cases.get(state.activeCaseId).get('editCase');
        // externally changed version of case
        const foundCase = Immutable.fromJS(action.payload);
        
        // how external changes differ from our fork point
        const remoteChanges = diff(snapCase, foundCase);
        // nothing to do if there are no remote changes
        if (remoteChanges.count() == 0) { return state; }
        
        // how our local changes differ from our fork point 
        const localChanges = diff(snapCase, editCase);
        // if there are no local changes, accept remote as snap and edit version
        if (localChanges.count() == 0) {
          state = state.mergeIn(['cases', state.activeCaseId, 'editCase'], foundCase);
          state = state.mergeIn(['cases', state.activeCaseId, 'snapCase'], foundCase);
          return state;
        }
        
        // merged set of changes with local changes at the end
        const changes = remoteChanges.concat(localChanges);
       
        // updated case which merges remote and local changes,
        // giving preference to our local changes
        const mergedCase = patch(editCase, changes);
        
        // update store's edited case with the merge
        state = state.mergeIn(['cases', state.activeCaseId, 'editCase'], mergedCase);
        
        // update store's snapshot to the new remote version
        state = state.mergeIn(['cases', state.activeCaseId, 'snapCase'], foundCase);
        
        return state;
      }
      return state;
    case APPLY_MACRO_TO_CASE:
      return state.updateIn(['cases', state.activeCaseId, 'appliedMacros'], function(macros) {
        return macros.add(action.payload);
      });
    default:
      return state;
  }
}
export function updateCase(payload:Object): Action<Object> {
  return { type: UPDATE_CASE, payload };
}
export function setActiveCaseId(payload: number): Action<Object> {
  return { type: SET_ACTIVE_CASE_ID, payload };
}
export function setCaseDetail(payload: Object): Action<Object> {
  return { type: SET_CASE_DETAIL, payload };
}
export function applyMacro(payload: Object): Action<Object> {
  return { type: APPLY_MACRO, payload };
}
export function applyMacroToCase(payload: Object): Action<Object> {
  return { type: APPLY_MACRO_TO_CASE, payload };
}
export function setSelectedMacro(payload: number): Action<Object> {
  return { type: SET_SELECTED_MACRO, payload };
}

export const getCaseDetail = (state, id) => state.caseStore.cases.get(id);
export const getActiveCaseDetail = (state) => state.caseStore.cases.get(state.caseStore.activeCaseId);
export const getActiveCase = (state) => getActiveCaseDetail(state).get('editCase');
export const getAppliedMacros = (state) => getActiveCaseDetail(state).get('appliedMacros');

export function* applyMacroSaga (getState) {
  while (true) {
    // wait for this action to be dispatched
    const action = yield take(APPLY_MACRO);
    // then process it

    // if we've hit the limit, dispatch limit event rather than proceeding to add
    const appliedMacros = getAppliedMacros(getState());
    if (2 < appliedMacros.size) {
      yield put(setMacroApplyError('Macro limit reached!'));
    } else if (appliedMacros.has(action.payload)) {
      yield put(setMacroApplyError('Macro already applied!'));
    } else {
      // add to case since limit not reached
      yield put(applyMacroToCase(action.payload));
    }
  }
}