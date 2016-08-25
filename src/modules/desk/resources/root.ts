
// TODO: Should this be renamed to 'states.ts' because all the other 
//  reducers are in files called 'states.ts'?

import {combineReducers} from 'redux';
import {CaseReducer, CaseListReducer, ChangesReducer} from './case';
import {customer} from './customer';
import {interaction} from './interaction';
import {UserReducer, UserListReducer} from './user';
import {NoteReducer, NoteListReducer} from './note';
import {LabelReducer} from './label';
import {defaultGenericListReducer, defaultGenericReducer} from 'restore';
// import {customers} from './customer';

/*export const entitiesReducer = combineReducers({
  case: CaseReducer,
  customer,
  interaction,
  user: UserReducer,
  note: NoteReducer,
  label: LabelReducer
  // customers
});

export const listsReducer = combineReducers({
  CASELIST: CaseListReducer,
  CHANGESLIST: ChangesReducer,
  USERLIST: UserListReducer
});*/

export const entityReducer = defaultGenericReducer();
export const listReducer = defaultGenericListReducer();