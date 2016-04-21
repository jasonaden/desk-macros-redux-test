import {createSelector} from 'reselect';
import {Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import {take, put, call, fork, cancel} from 'redux-saga/effects';
import * as Immutable from 'immutable';

import {ICase, getCases, getCaseById} from '../desk/resources/case';
import {setMacroApplyError} from '../desk-agent-case-macros/states';

export const Case = Immutable.Record({
  openCase: null,
  selectedMacro: -1,
  appliedMacros: Immutable.Set()
});



export const SET_OPEN_CASE = 'SET_OPEN_CASE';
export const SET_SELECTED_MACRO = 'SET_SELECTED_MACRO';
export const APPLY_MACRO = 'APPLY_MACRO';
export const APPLY_MACRO_TO_CASE = 'APPLY_MACRO_TO_CASE';

export const caseDetail:Reducer = (state = new Case(), action:Action<any>) => {
  switch(action.type) {
    case SET_OPEN_CASE:
      return state.set('openCase', action.payload);
    case SET_SELECTED_MACRO:
      return state.set('selectedMacro', action.payload);
    case APPLY_MACRO_TO_CASE:
      return state.updateIn(['appliedMacros'], function(macros) {
        return macros.add(action.payload);
      });
    default:
      return state;
  }
}

export function setOpenCase(payload: ICase): Action<Object> {
  return {
    type: SET_OPEN_CASE,
    payload
  };
}
export function applyMacro(payload: Object): Action<Object> {
  return {
    type: APPLY_MACRO, 
    payload
  };
}
export function applyMacroToCase(payload: Object): Action<Object> {
  return {
    type: APPLY_MACRO_TO_CASE, 
    payload
  };
}
export function setSelectedMacro(payload: number): Action<Object> {
  return {
    type: SET_SELECTED_MACRO,
    payload
  };
}

export const getOpenCase = (state):ICase => state.deskAgentCaseDetail.openCase;
export const getSelectedMacroId = (state) => state.deskAgentCaseDetail.selectedMacroId;
export const getAppliedMacros = (state) => state.deskAgentCaseDetail.appliedMacros.toJS();

export function* applyMacroSaga (getState) {
  while (true) {
    // wait for this action to be dispatched
    const action = yield take(APPLY_MACRO);
    // then process it
    
    // if we've hit the limit, dispatch limit event rather than proceeding to add
    const kase = getOpenCase(getState());
    const appliedMacros = getAppliedMacros(getState());
    if (2 < appliedMacros.length) {
      yield put(setMacroApplyError('Macro limit reached!'));
    } else if (-1 < appliedMacros.indexOf(action.payload)) {
      yield put(setMacroApplyError('Macro already applied!'));
    } else {
      // add to case since limit not reached
      yield put(applyMacroToCase(action.payload));
    }
  }
}
