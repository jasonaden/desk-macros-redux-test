import {createSelector} from 'reselect';
import {Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import {DeskStore} from '../desk/states';

export interface ICase {
  id: number,
  subject: string,
  macros: Number[]
}

// CASES
export const SET_CASES = "SET_CASES";
export function setCases(payload: Object[]): Action<Object[]> {
  return {
    type: SET_CASES,
    payload
  }
};
export const APPLY_MACRO_TO_CASE = "APPLY_MACRO_TO_CASE";
export function applyMacroToCase (payload: Object): Action<Object> {
  return {
    type: APPLY_MACRO_TO_CASE,
    payload
  };
}
const cases:Reducer = (state:ICase[] = [], action:Action<ICase[]>) => {
  switch (action.type) {
		case SET_CASES:
			return action.payload.slice(0).map(kase => {
        kase.macros = [];
        return kase;
      });
    case 'APPLY_MACRO_TO_CASE':
      return state.map(kase => {
        if (kase.id !== action.payload.caseId) {
          return kase;
        }
        
        if (kase.macros.indexOf(action.payload.macroId) > -1) {
          return kase;
        }

        return Object.assign({}, kase,
          { macros: [...kase.macros, action.payload.macroId] });
      });
		default:
			return state;
	}
}
export const getCases = (state): ICase[] => state.deskAgentCase.cases;

export const caseReducers = combineReducers({
  cases
});