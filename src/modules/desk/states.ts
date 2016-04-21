import {combineReducers} from 'redux';

import {macroReducers} from '../desk-agent-case-macros/states';
import {caseListReducers} from '../desk-agent-case-list/states';
import {caseDetailReducers} from '../desk-agent-case-detail/states';
import {entitiesReducer} from './resources/root';

export const rootReducer = combineReducers({
  entities: entitiesReducer,
  deskAgentCaseMacros: macroReducers,
  deskAgentCaseDetail: caseDetailReducers,
  deskAgentCaseList: caseListReducers
});

