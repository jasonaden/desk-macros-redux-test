
import {AppStore} from '../store';
import {bindActionCreators as bac} from 'redux';

export const SET_MACROS = "SET_MACROS";
export const setMacros = bac(function setMacros(data: Object[]) {
  return {
    type: SET_MACROS,
    data
  }
}, AppStore.dispatch);

export const SELECT_MACRO = "SELECT_MACRO";
export const selectMacro = bac(function selectMacro(data: number) {
  return {
    type: SELECT_MACRO,
    data
  }
}, AppStore.dispatch);

export const SET_MACRO_FILTER = "SET_MACRO_FILTER";
export const setMacroFilter = bac(function setMacroFilter(data: string) {
  return {
    type: SET_MACRO_FILTER,
    data
  }
}, AppStore.dispatch);

export const SET_FOLDER_FILTER = "SET_FOLDER_FILTER";
export const setFolderFilter = bac(function setFolderFilter(data: string) {
  return {
    type: SET_FOLDER_FILTER,
    data
  }
}, AppStore.dispatch);

export const ADD_MACRO_FILTER = "ADD_MACRO_FILTER";
export const addMacroFilter = bac(function addMacroFilter(data: string) {
  return {
    type: ADD_MACRO_FILTER,
    data
  }
}, AppStore.dispatch);
