import {combineReducers} from 'redux';
import {takeEvery} from 'redux-saga';

import {macroReducers} from '../desk-agent-case-macros/states';
import {caseReducers} from '../desk-agent-case/states';
import {caseListReducers} from '../desk-agent-case-list/states';
import {caseDetailReducers} from '../desk-agent-case-detail/states';

export function* mixPanel(getState) {
  while (true) {
    yield takeEvery('*', logIt, getState());
  }
}

function* logIt(state, action) {
  console.log('****************');
  console.log('State:', state);
  console.log('Action: ' + action.type, action.payload);
}

export const rootReducer = combineReducers({
  deskAgentCaseMacros: macroReducers,
  deskAgentCase: caseReducers,
  deskAgentCaseDetail: caseDetailReducers,
  deskAgentCaseList: caseListReducers
});

