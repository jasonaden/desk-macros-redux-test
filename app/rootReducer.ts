import {combineReducers} from '@ngrx/store';
import {macroReducers} from './macros/states/reducers';
import {caseReducers} from './cases/states/reducers';

export const rootReducer = combineReducers({
  macros: macroReducers,
  cases: caseReducers
})