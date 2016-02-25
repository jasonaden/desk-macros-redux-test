
import {Reducer, Action, combineReducers} from '@ngrx/store';
import {ICase} from '../../desk-agent-case/states/interfaces';
import {SET_OPEN_CASE, APPLY_MACRO_TO_CASE} from './actions';

export const openCase:Reducer<ICase> = (state:ICase = null, action) => {
  switch(action.type) {
    case SET_OPEN_CASE:
      return Object.assign({}, action.payload);
    case APPLY_MACRO_TO_CASE:
      if (state.macros.indexOf(action.payload) > -1) {
        return state;
      }
      return Object.assign({}, state,
        { macros: [...state.macros, action.payload] }
      );
    default:
      return state;
  }
}

export const caseDetailReducers = combineReducers({
  openCase
});
