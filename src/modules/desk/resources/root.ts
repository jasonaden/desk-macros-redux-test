import {combineReducers} from 'redux';
import {kase} from './case';
import {customer} from './customer';
import {interaction} from './interaction';
// import {customers} from './customer';

export const entitiesReducer = combineReducers({
  case: kase,
  customer,
  interaction
  // customers
});

