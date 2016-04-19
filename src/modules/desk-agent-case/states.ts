import {createSelector} from 'reselect';
import {Reducer, combineReducers} from 'redux';
import * as thunk from 'redux-thunk';
import {Action} from 'flux-standard-action';

import {setMacroApplyError} from '../desk-agent-case-macros/states';
import {getCaseById} from '../desk/resources/case';

export const APPLY_MACRO = 'APPLY_MACRO';
export const MACRO_APPLY_ERROR = 'MACRO_APPLY_ERROR';
export function applyMacro (payload: Object): Action<Object> {
  return {
    type: APPLY_MACRO, 
    payload
  };
}

export const APPLY_MACRO_TO_CASE = "APPLY_MACRO_TO_CASE";
export function applyMacroToCase (payload: {caseId: number, macroId: number}) {
  return (dispatch, getState) => {
    const kase = getCaseById(getState(), payload.caseId);
    
    if (2 < kase.macros.length) {
      dispatch(setMacroApplyError('Macro limit reached!'));
    } else if (-1 < kase.macros.indexOf(payload.macroId)) {
      dispatch(setMacroApplyError('Macro already applied!'));
    } else {
      dispatch(applyMacro(payload));
    }
  }
}
