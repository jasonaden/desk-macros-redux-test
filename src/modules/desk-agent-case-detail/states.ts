import {createSelector} from 'reselect';
import {Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import {take, put, call, fork, cancel} from 'redux-saga/effects';
import * as Immutable from 'immutable';
import * as diff from 'immutablediff';

import {Case} from '../desk/resources/case';
import {setMacroApplyError} from '../desk-agent-case-macros/states';

// TODO: I added some TODO's to this just to remind us to talk about 
//  whether some of this should be moved into individual files. 
//  I don't want to go crazy about splitting things up because at 
//  some point that makes it harder to find and fix things. But 
//  we can go too far in keeping things in one place.

// TODO: Should we move these record definitions to a ./constants file?
// *** Data structures 
export const CaseDetails = Immutable.Record({
  activeCaseId: -1,
  caseDetails: Immutable.Map()
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
// *** End data structures

// TODO: Wondering 2 things about these action constants - 
//  1) Should we move them to a ./constants file? 
//  2) Should they be moved to a top level actionConstants file (or something like that)? 
//    since that might make it easier to know if we're re-using the same name somewhere 
//    else. Just wondering this since any action is potentially called whenever 
//    any action is dispatched. 
// Action names
export const SET_ACTIVE_CASE_ID = 'SET_ACTIVE_CASE_ID';
export const SET_CASE_DETAIL = 'SET_CASE_DETAIL';
export const SET_SNAP_CASE = 'SET_SNAP_CASE';
export const SET_EDIT_CASE = 'SET_EDIT_CASE';
export const PATCHED_CASE = 'PATCHED_CASE';
export const SET_CAN_UPDATE = 'SET_CAN_UPDATE';
export const SET_SELECTED_MACRO = 'SET_SELECTED_MACRO';
export const APPLY_MACRO = 'APPLY_MACRO';
export const APPLY_MACRO_TO_CASE = 'APPLY_MACRO_TO_CASE';
export const MACRO_APPLY_ERROR = 'MACRO_APPLY_ERROR';
export const UPDATE_CASE = 'UPDATE_CASE';
// End action names

// Reducer
export const caseDetailStore:Reducer = (state = new CaseDetails(), action:Action<any>) => {
  switch(action.type) {
    case SET_CASE_DETAIL:
      return state.mergeIn(['caseDetails', action.payload.caseId], action.payload.detail);
    case SET_ACTIVE_CASE_ID:
      return state.set('activeCaseId', action.payload);
    case SET_CAN_UPDATE:
      return state.mergeIn(['caseDetails', state.get('activeCaseId'), 'canUpdate'], action.payload);
    case PATCHED_CASE:
      return state.mergeIn(['caseDetails', state.get('activeCaseId'), 'canUpdate'], action.payload);
    case SET_SNAP_CASE:
      return state.mergeIn(['caseDetails', action.payload.get('id'), 'snapCase'], action.payload);
    case SET_EDIT_CASE:
      return state.mergeIn(['caseDetails', action.payload.get('id'), 'editCase'], action.payload);
    case APPLY_MACRO_TO_CASE:
      return state.updateIn(['caseDetails', state.get('activeCaseId'), 'appliedMacros'], function(macros) {
        return macros.add(action.payload);
      });
    default:
      return state;
  }
}
// End Reducer

// TODO: Same question about actionCreators -- should they be in a separate file? 
// Action Creators
export function setEditCase(payload:Object){
  return (dispatch, getState) => {
    let state = getState();
    if (!canUpdate(state)) {
      let snapCase = getSnapCase(getState()) != null
      if(snapCase && diff(snapCase, payload).size) {
        dispatch({ type: SET_CAN_UPDATE, payload: true });
      }
    }
    return dispatch({ type: SET_EDIT_CASE, payload });
  };
}
export function setSnapCase(payload:Object): Action<Object> {
  return { type: SET_SNAP_CASE, payload };
}
export function setCanUpdate(payload:Object): Action<Object> {
  return { type: SET_CAN_UPDATE, payload: true };
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
// End Action creators

// TODO: Similar question about the selectors, should they be in 
//  their own file? 
// Selectors
export const getActiveCaseId = (state) => state.caseDetailStore.activeCaseId;
export const getSnapCase = (state) => getActiveCaseDetail(state).get('snapCase');
export const getCaseDetail = (state, id) => state.caseDetailStore.caseDetails.get(id);
export const getActiveCaseDetail = (state) => state.caseDetailStore.caseDetails.get(state.caseDetailStore.activeCaseId);
export const getActiveCase = (state) => getActiveCaseDetail(state).get('editCase');
export const getAppliedMacros = (state) => getActiveCaseDetail(state).get('appliedMacros');
export const canUpdate = (state) => getActiveCaseDetail(state).get('canUpdate');
// End selectors

// TODO: Saga seems to want to have consistentcy between the types
//  returned from the yield statements
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