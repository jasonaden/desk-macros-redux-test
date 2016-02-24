
import {Action} from '@ngrx/store';

export const SET_CASES = "SET_CASES";
export const setCases = function setCases(payload: Object[]): Action {
  return {
    type: SET_CASES,
    payload
  }
};

export const APPLY_MACRO_TO_CASE = "APPLY_MACRO_TO_CASE";
export function applyMacroToCase (payload: Object): Action {
  return {
    type: APPLY_MACRO_TO_CASE,
    payload
  }
}