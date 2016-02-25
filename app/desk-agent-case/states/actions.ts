
import {Action} from '@ngrx/store';

export const SET_CASES = "SET_CASES";
export const setCases = function setCases(payload: Object[]): Action {
  return {
    type: SET_CASES,
    payload
  }
};
