import {createSelector} from 'reselect';
import {Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import {take, put, call, fork, cancel} from 'redux-saga/effects';
import {takeLatest, SagaCancellationException} from 'redux-saga';
import * as Immutable from 'immutable';

import {APPLY_MACRO, MACRO_APPLY_ERROR} from '../desk-agent-case-detail/states';
import {getOpenCase} from '../desk-agent-case-detail/states';

export interface IMacro {
  id: number,
  name: string,
  folders: String[]
}

// MACROS
export const SET_MACROS = "SET_MACROS";
export const setMacros = function setMacros(payload: Object[]): Action<Object[]> {
  return {
    type: SET_MACROS,
    payload
  }
};

const macros:Reducer = (state = Immutable.Map(), action:Action<Object[]>) => {
  switch (action.type) {
		case SET_MACROS:
			return Immutable.fromJS(action.payload);
		default:
			return state;
	}
}
export const getMacros = (state): IMacro[] => state.deskAgentCaseMacros.macros.toJS();

// SELECTED MACRO
export const SET_SELECTED_MACRO_ID = "SET_SELECTED_MACRO_ID";
export function setSelectedMacroId (payload: number): Action<number> {
  return {
    type: SET_SELECTED_MACRO_ID,
    payload
  }
}

const selectedMacroId:Reducer = (state:number = -1, action:Action<number>) => {
  switch (action.type) {
    case SET_SELECTED_MACRO_ID:
      return action.payload
    case SET_MACRO_FILTER:
    case APPLY_MACRO:
      return -1;
    default:
      return state;
  }
}
export const getSelectedMacroId = (state): number => state.deskAgentCaseMacros.selectedMacroId;
export const getSelectedMacro: (state) => IMacro = createSelector(getMacros, getSelectedMacroId, selectedMacroFinder);
function selectedMacroFinder (macros: IMacro[], selectedMacroId: number) {
  return macros.find(macro => macro.id == selectedMacroId);
}

// MACRO FILTER / FILTERED MACROS
export const SET_MACRO_FILTER = "SET_MACRO_FILTER";
export function setMacroFilter(payload: string): Action<string> {
  return {
    type: SET_MACRO_FILTER,
    payload
  }
}
const macroFilter:Reducer = (state = '', action:Action<string>) => {
  switch (action.type) {
    case SET_MACRO_FILTER:
      return action.payload;
    default:
      return state;
  }
}
export const getMacroFilter = (state): string => state.deskAgentCaseMacros.macroFilter;
export const getFilteredMacros: (state) => IMacro[] = createSelector(getMacros, getMacroFilter, filteredMacrosFinder);
function filteredMacrosFinder (macros: IMacro[], macroFilter: string) {
  return macros.filter(macro => macro.name.toLowerCase().indexOf(macroFilter.toLowerCase()) > -1);
}


// MACROS FROM CASE (return list by ids)
export const getMacrosFromOpenCase: (state) => IMacro[] = createSelector(getMacros, getOpenCase, macrosFromOpenCaseFinder);
function macrosFromOpenCaseFinder(macros, kase?) {
  let caseMacros = []
  
  if (!kase || !kase.macros) return caseMacros;
  
  kase.macros.forEach(macroId => {
    caseMacros.push(macros.find(m => m.id == macroId));
  });
  return caseMacros;
}

const SET_MACRO_APPLY_ERROR = 'SET_MACRO_APPLY_ERROR';
export const setMacroApplyError = function setMacroApplyError(payload: string): Action<Object> {
  return {
    type: SET_MACRO_APPLY_ERROR,
    payload
  };
}
const CLEAR_MACRO_APPLY_ERROR = 'CLEAR_MACRO_APPLY_ERROR';
export const clearMacroApplyError = function clearMacroApplyError(): Action<Object> {
  return {
    type: CLEAR_MACRO_APPLY_ERROR,
    payload: ''
  };
}
const macroApplyError:Reducer = (state = '', action:Action<string>) => {
  switch (action.type) {
    case SET_MACRO_APPLY_ERROR:
      return action.payload;
    case CLEAR_MACRO_APPLY_ERROR:
      return '';
    default:
      return state;
  }
}

export const getMacroApplyError = (state):string => state.deskAgentCaseMacros.macroApplyError;

export function* failedToApplySaga (getState) {
  yield* takeLatest(SET_MACRO_APPLY_ERROR, clearError);
}

function* clearError() {
  try {
    yield call(delay, 3000);
    yield put(clearMacroApplyError());
  } catch (error) {
    if(error instanceof SagaCancellationException) {
      //event was canceled either by cancel or takeLatest
    }
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const macroReducers = combineReducers({
  macroFilter,
  selectedMacroId,
  macros,
  macroApplyError
});