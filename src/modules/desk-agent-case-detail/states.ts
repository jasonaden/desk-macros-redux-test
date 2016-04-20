import {createSelector} from 'reselect';
import {Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import {take, put, call, fork, cancel} from 'redux-saga/effects';

import {ICase, getCases} from '../desk/resources/case';
import {setMacroApplyError} from '../desk-agent-case-macros/states';

// OPEN CASE
export const SET_OPEN_CASE = 'SET_OPEN_CASE';
export function setOpenCase(payload: ICase): Action<Object> {
  return {
    type: SET_OPEN_CASE,
    payload
  }
}
export const openCase:Reducer = (state:ICase = null, action) => {
  switch(action.type) {
    case SET_OPEN_CASE:
      return Object.assign({}, action.payload);
    case APPLY_MACRO:
      return Object.assign({}, state, 
        {macros: [...state.macros || [], action.payload]})
    default:
      return state;
  }
}
export const getOpenCase = (state): ICase => state.deskAgentCaseDetail.openCase; 

export const APPLY_MACRO = 'APPLY_MACRO';
export const MACRO_APPLY_ERROR = 'MACRO_APPLY_ERROR';
export function applyMacro (payload: Object): Action<Object> {
  return {
    type: APPLY_MACRO, 
    payload
  };
}

export const APPLY_MACRO_TO_CASE = "APPLY_MACRO_TO_CASE";
export function applyMacroToCase (payload: number): Action<Object> {
  return {
    type: APPLY_MACRO_TO_CASE,
    payload
  };
}
export function* applyMacroSaga (getState) {
  while (true) {
    // wait for this action to be dispatched
    const action = yield take(APPLY_MACRO_TO_CASE);
    // then process it
    
    // if we've hit the limit, dispatch limit event rather than proceeding to add
    const kase = getOpenCase(getState());
    if (kase.macros && (2 < kase.macros.length)) {
      yield put(setMacroApplyError('Macro limit reached!'));
    } else if (kase.macros && (-1 < kase.macros.indexOf(action.payload))) {
      yield put(setMacroApplyError('Macro already applied!'));
    } else {
      // add to case since limit not reached
      yield put(applyMacro(action.payload));
    }
  }
}

export const caseDetailReducers = combineReducers({
  openCase
});
