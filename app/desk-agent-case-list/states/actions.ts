
import {Action} from '@ngrx/store';

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
