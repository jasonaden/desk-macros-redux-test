import {combineReducers} from '@ngrx/store';
import {macroReducers} from '../../desk-agent-case-macros/states/reducers';
import {caseReducers} from '../../desk-agent-case/states/reducers';

export const rootReducer = combineReducers({
  deskAgentCaseMacros: macroReducers,
  deskAgentCase: caseReducers
})