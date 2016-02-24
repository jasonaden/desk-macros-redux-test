import {combineReducers} from '@ngrx/store';
import {macroReducers} from '../../desk-agent-case-macros/states/reducers';
import {caseReducers} from '../../desk-agent-case/states/reducers';
import {caseListReducers} from '../../desk-agent-case-list/states/reducers';
//import {caseDetailReducers} from '../../desk-agent-case-detail/states/reducers';

export const rootReducer = combineReducers({
  deskAgentCaseMacros: macroReducers,
  deskAgentCase: caseReducers,
//  deskAgentCaseDetail: caseDetailReducers,
  deskAgentCaseList: caseListReducers
});