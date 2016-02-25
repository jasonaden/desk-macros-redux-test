import {createSelector} from 'reselect';
import {Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import {APPLY_MACRO_TO_CASE} from '../desk-agent-case/states';
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
const macros:Reducer = (state:Object[] = [], action:Action<Object[]>) => {
  switch (action.type) {
		case SET_MACROS:
			return action.payload.slice(0);
		default:
			return state;
	}
}
export const getMacros = (state): IMacro[] => state.deskAgentCaseMacros.macros;

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
      return action.payload;
    case SET_MACRO_FILTER:
    case APPLY_MACRO_TO_CASE:
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
export function setMacroFilter(payload: string): Action {
  return {
    type: SET_MACRO_FILTER,
    payload
  }
}
const macroFilter:Reducer = (state:string = '', action:Action<string>) => {
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
function macrosFromOpenCaseFinder(macros, kase) {
  let caseMacros = []
  kase.macros.forEach(macroId => {
    caseMacros.push(macros.find(m => m.id == macroId));
  });
  return caseMacros;
}


export const macroReducers = combineReducers({
  macroFilter,
  selectedMacroId,
  macros
});