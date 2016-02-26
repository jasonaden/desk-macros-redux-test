import {combineReducers} from 'redux';

import {macroReducers} from '../desk-agent-case-macros/states';
import {caseReducers} from '../desk-agent-case/states';
import {caseListReducers} from '../desk-agent-case-list/states';
import {caseDetailReducers} from '../desk-agent-case-detail/states';

export const rootReducer = combineReducers({
  deskAgentCaseMacros: macroReducers,
  deskAgentCase: caseReducers,
  deskAgentCaseDetail: caseDetailReducers,
  deskAgentCaseList: caseListReducers
});

