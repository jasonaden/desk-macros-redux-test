import {createSelector} from 'reselect';
import {Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import {take, put, call, fork, cancel} from 'redux-saga/effects';
import * as Immutable from 'immutable';
import * as diff from 'immutablediff';

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
export const SET_SNAP_CASE = 'SET_SNAP_CASE';
export const SET_EDIT_CASE = 'SET_EDIT_CASE';
export const SET_CAN_UPDATE = 'SET_CAN_UPDATE';
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
    case SET_CAN_UPDATE:
      return state.mergeIn(['cases', state.activeCaseId, 'canUpdate'], action.payload);
    case SET_SNAP_CASE:
      return state.mergeIn(['cases', action.payload.get('id'), 'snapCase'], action.payload);
    case SET_EDIT_CASE:
      return state.mergeIn(['cases', action.payload.get('id'), 'editCase'], action.payload);
    case APPLY_MACRO_TO_CASE:
      return state.updateIn(['cases', state.activeCaseId, 'appliedMacros'], function(macros) {
        return macros.add(action.payload);
      });
    default:
      return state;
  }
}
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

export const getActiveCaseId = (state) => state.caseStore.activeCaseId;
export const getSnapCase = (state) => getActiveCaseDetail(state).get('snapCase');
export const getCaseDetail = (state, id) => state.caseStore.cases.get(id);
export const getActiveCaseDetail = (state) => state.caseStore.cases.get(state.caseStore.activeCaseId);
export const getActiveCase = (state) => getActiveCaseDetail(state).get('editCase');
export const getAppliedMacros = (state) => getActiveCaseDetail(state).get('appliedMacros');
export const canUpdate = (state) => getActiveCaseDetail(state).get('canUpdate');

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