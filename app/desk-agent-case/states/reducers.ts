
import {Reducer, Action, combineReducers} from '@ngrx/store';

import { SET_CASES, APPLY_MACRO_TO_CASE } from './actions';
import {ICase} from './interfaces';

const cases:Reducer<ICase[]> = (state:ICase[] = [], action:Action) => {
  switch (action.type) {
		case SET_CASES:
			return action.payload.slice(0).map(kase => {
        kase.macros = [];
        return kase;
      });
    case APPLY_MACRO_TO_CASE:
      return state.map(kase => {
        if (kase.id !== action.payload.caseId) {
          return kase;
        }
        
        if (kase.macros.indexOf(action.payload.macro) > -1) {
          return kase;
        }

        return Object.assign({}, kase,
          { macros: [...kase.macros, action.payload.macro] }
        );
      });
		default:
			return state;
	}
}

export const caseReducers = combineReducers({
  cases
})
