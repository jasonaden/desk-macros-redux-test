
import {Action} from '@ngrx/store';

export const SET_OPEN_CASE = 'SET_OPEN_CASE';
export function openCase(payload: Object): Action {
  return {
    type: SET_OPEN_CASE,
    payload
  }
}

export const APPLY_MACRO_TO_CASE = "APPLY_MACRO_TO_CASE";
export function applyMacroToCase (payload: Object): Action {
  return {
    type: APPLY_MACRO_TO_CASE,
    payload
  };
}