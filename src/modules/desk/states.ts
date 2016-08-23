import {combineReducers} from 'redux';
import {router} from 'redux-ui-router';
import {applyMiddleware} from 'redux';
import {ngRedux, Middleware} from 'ng-redux';
import * as thunk from 'redux-thunk';
import * as createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import {deskMod} from './module';
import {macroFilter} from '../desk-agent-case-macros/states';
import {filterStore} from '../desk-agent-case-list/states';
import {caseDetailStore} from '../desk-agent-case-detail/states';
import {entitiesReducer, listsReducer, listReducer} from './resources/root';
import {failedToApplySaga, setMacros} from '../desk-agent-case-macros/states';
import {applyMacroSaga} from '../desk-agent-case-detail/states';
import {macroList} from '../../data/macros';
import {CaseListReducer} from '../desk/resources/case';

export const rootReducer = combineReducers({
  router,
  entities: entitiesReducer,
  lists: listsReducer,
  list: listReducer,
  deskAgentCaseMacros: macroFilter,
  caseDetailStore,
  filterStore
});
