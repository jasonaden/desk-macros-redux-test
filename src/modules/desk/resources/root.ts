import {combineReducers} from 'redux';
import {CaseReducer} from './case';
import {customer} from './customer';
import {interaction} from './interaction';
// import {customers} from './customer';

export const entitiesReducer = combineReducers({
  case: CaseReducer
  customer,
  interaction
  // customers
});

