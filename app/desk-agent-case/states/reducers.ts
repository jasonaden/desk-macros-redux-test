
import {Reducer, Action, combineReducers} from '@ngrx/store';

import { SET_CASES } from './actions';
import {ICase} from './interfaces';

const cases:Reducer<ICase[]> = (state:ICase[] = [], action:Action) => {
  switch (action.type) {
		case SET_CASES:
			return action.payload.slice(0).map(kase => {
        kase.macros = [];
        return kase;
      });
		default:
			return state;
	}
}

export const caseReducers = combineReducers({
  cases
})
