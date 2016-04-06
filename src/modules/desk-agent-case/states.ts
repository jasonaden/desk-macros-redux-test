import {createSelector} from 'reselect';
import {Reducer, combineReducers} from 'redux';
import * as thunk from 'redux-thunk';
import {Action} from 'flux-standard-action';

import {setMacroApplyError} from '../desk-agent-case-macros/states';

// export interface ICase {
//   id: number,
//   subject: string,
//   macros: Number[]
// }

// CASES
// export const SET_CASES = "SET_CASES";
// export function setCases(payload: Object[]): Action<Object[]> {
//   return {
//     type: SET_CASES,
//     payload
//   }
// };

export const APPLY_MACRO = 'APPLY_MACRO';
export const MACRO_APPLY_ERROR = 'MACRO_APPLY_ERROR';
export function applyMacro (payload: Object): Action<Object> {
  return {
    type: APPLY_MACRO, 
    payload
  };
}

export const APPLY_MACRO_TO_CASE = "APPLY_MACRO_TO_CASE";
export function applyMacroToCase (payload: {caseId: number, macroId: number}) {
  return (dispatch, getState) => {
    const kase = getCaseById(getState(), payload.caseId);
    
    if (2 < kase.macros.length) {
      dispatch(setMacroApplyError('Macro limit reached!'));
    } else if (-1 < kase.macros.indexOf(payload.macroId)) {
      dispatch(setMacroApplyError('Macro already applied!'));
    } else {
      dispatch(applyMacro(payload));
    }
  }
}
// const cases:Reducer = (state:ICase[] = [], action: Action<any>) => {
//   switch (action.type) {
// 		case SET_CASES:
// 			return action.payload.slice(0).map(kase => {
//         kase.macros = [];
//         return kase;
//       });
//     case APPLY_MACRO:
//       return state.map(kase => {
//         if (kase.id !== action.payload.caseId) {
//           return kase;
//         }
        
//         if (kase.macros.indexOf(action.payload.macroId) > -1) {
//           return kase;
//         }

//         return Object.assign({}, kase,
//           { macros: [...kase.macros, action.payload.macroId] });
//       });
// 		default:
// 			return state;
// 	}
// }
// export const getCases = (state): ICase[] => state.deskAgentCase.cases;
// export const getCaseById = (state, id):ICase => getCases(state).find(kase => kase.id==id);

// export const caseReducers = combineReducers({
//   cases
// });