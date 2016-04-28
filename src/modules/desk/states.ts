import {combineReducers} from 'redux';
import {router} from 'redux-ui-router';

import {macroFilter} from '../desk-agent-case-macros/states';
import {filterStore} from '../desk-agent-case-list/states';
import {caseStore} from '../desk-agent-case-detail/states';
import {entitiesReducer} from './resources/root';

export const rootReducer = combineReducers({
  router,
  entities: entitiesReducer,
  deskAgentCaseMacros: macroFilter,
  caseStore,
  filterStore
});

