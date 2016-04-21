import {combineReducers} from 'redux';
//import {combineReducers} from 'redux-immutable';

import {macroFilter} from '../desk-agent-case-macros/states';
import {caseFilter} from '../desk-agent-case-list/states';
import {caseDetail} from '../desk-agent-case-detail/states';
import {entitiesReducer} from './resources/root';

export const rootReducer = combineReducers({
  entities: entitiesReducer,
  deskAgentCaseMacros: macroFilter,
  deskAgentCaseDetail: caseDetail,
  filter: caseFilter
});

