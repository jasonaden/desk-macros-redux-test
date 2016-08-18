import {createSelector} from 'reselect';
import {Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import {take, put, call, fork, cancel} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import * as Immutable from 'immutable';

import {APPLY_MACRO, MACRO_APPLY_ERROR} from '../desk-agent-case-detail/states';
// TODO: 'getOpenCaseId' doesn't exist, perhaps a remnant
// import {getOpenCaseId} from '../desk-agent-case-detail/states';
import {getCaseById} from '../desk/resources/case';

export interface IMacro {
  id: number,
  name: string,
  folders: String[]
}

export const MacroFilter = Immutable.Record({
  macros: Immutable.Set(),
  selectedMacroId: -1,
  macroFilter: '',
  macroApplyError: ''
});

export const SET_MACROS = 'SET_MACROS';
export const SET_SELECTED_MACRO_ID = "SET_SELECTED_MACRO_ID";
export const SET_MACRO_FILTER = 'SET_MACRO_FILTER';
export const SET_MACRO_APPLY_ERROR = 'SET_MACRO_APPLY_ERROR';
export const CLEAR_MACRO_APPLY_ERROR = 'CLEAR_MACRO_APPLY_ERROR';

export const macroFilter:Reducer = (state = new MacroFilter(), action:Action<any>) => {
  switch( action.type ) {
    case SET_MACROS:
      return state.set('macros', action.payload);
    case SET_SELECTED_MACRO_ID:
      return state.set('selectedMacroId', action.payload);
    case APPLY_MACRO:
      return state.set('selectedMacroId', -1);
    case SET_MACRO_FILTER:
      return state.set('macroFilter', action.payload);
    case SET_MACRO_APPLY_ERROR:
      return state.set('macroApplyError', action.payload);
    case CLEAR_MACRO_APPLY_ERROR:
      return state.set('macroApplyError', '');  
    default:
      return state;
  }
}

export function setMacros (payload: Object[]): Action<Object[]> {
  return {
    type: SET_MACROS,
    payload
  };
}

export function setSelectedMacroId (payload: number): Action<number> {
  return {
    type: SET_SELECTED_MACRO_ID,
    payload
  };
}

export function setMacroFilter(payload: string): Action<string> {
  return {
    type: SET_MACRO_FILTER,
    payload
  }
}

export function setMacroApplyError(payload: string): Action<string> {
  return {
    type: SET_MACRO_APPLY_ERROR,
    payload
  }
}

export function clearMacroApplyError(): Action<string> {
  return {
    type: CLEAR_MACRO_APPLY_ERROR
  }
}


export const getSelectedMacro = (state) => {
  return state.deskAgentCaseMacros.macros.find( m => {
    return m.id == state.deskAgentCaseMacros.selectedMacroId;
  });
}
export const getMacroFilter = (state) => state.deskAgentCaseMacros.toJS();
export const getFilteredMacros = (state) => {
  if( state.deskAgentCaseMacros.macroFilter !== '' ) {
    return state.deskAgentCaseMacros.macros.filter( macro => {
      return -1 < macro.name.toLowerCase().indexOf(
        state.deskAgentCaseMacros.macroFilter.toLowerCase()
      );
    });
  } else {
    return state.deskAgentCaseMacros.macros;
  }
}

export function* failedToApplySaga (getState) {
  yield* takeLatest(SET_MACRO_APPLY_ERROR, clearError);
}

function* clearError() {
  try {
    yield call(delay, 3000);
    yield put(clearMacroApplyError());
  } catch (error) {
    // TODO: add error handling. It looks like SagaCancellationException
    //  no longer exists. Error handling described at: 
    // https://github.com/yelouafi/redux-saga/blob/master/docs/basics/ErrorHandling.md
    //if(error instanceof SagaCancellationException) {
      //event was canceled either by cancel or takeLatest
    //}
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/*export const macroReducers = combineReducers({
  macroFilter,
  selectedMacroId,
  macros,
  macroApplyError
});*/