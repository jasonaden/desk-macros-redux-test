
import {Action} from '@ngrx/store';

export const SET_MACROS = "SET_MACROS";
export const setMacros = function setMacros(payload: Object[]): Action {
  return {
    type: SET_MACROS,
    payload
  }
};

export const SELECT_MACRO = "SELECT_MACRO";
export function setSelectedMacro (payload: number): Action {
  return {
    type: SELECT_MACRO,
    payload
  }
}

export const SET_MACRO_FILTER = "SET_MACRO_FILTER";
export function setMacroFilter(payload: string): Action {
  return {
    type: SET_MACRO_FILTER,
    payload
  }
}

export const SET_FOLDER_FILTER = "SET_FOLDER_FILTER";
export function setFolderFilter(payload: string): Action {
  return {
    type: SET_FOLDER_FILTER,
    payload
  }
}

export const ADD_MACRO_FILTER = "ADD_MACRO_FILTER";
export function addMacroFilter(payload: string): Action {
  return {
    type: ADD_MACRO_FILTER,
    payload
  }
}
