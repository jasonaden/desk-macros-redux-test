
import {Action} from '@ngrx/store';

export const SET_CASES = "SET_CASES";
export const setCases = function setCases(payload: Object[]): Action {
  return {
    type: SET_CASES,
    payload
  }
};

export const SELECT_CASE = "SELECT_CASE";
export function setSelectedCase (payload: number): Action {
  return {
    type: SELECT_CASE,
    payload
  }
}

export const SET_CASE_FILTER = "SET_CASE_FILTER";
export function setCaseFilter(payload: string): Action {
  return {
    type: SET_CASE_FILTER,
    payload
  }
}
