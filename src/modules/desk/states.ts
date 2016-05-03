import {combineReducers} from 'redux';
import {router} from 'redux-ui-router';
import {applyMiddleware} from 'redux';
import {ngRedux, Middleware} from 'ng-redux';
import * as thunk from 'redux-thunk';
import * as createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import * as storage from 'redux-storage';
import merger from 'redux-storage-merger-immutablejs';

import {deskMod} from './module';
import {macroFilter} from '../desk-agent-case-macros/states';
import {filterStore} from '../desk-agent-case-list/states';
import {caseStore} from '../desk-agent-case-detail/states';
import {entitiesReducer} from './resources/root';
import {failedToApplySaga, setMacros} from '../desk-agent-case-macros/states';
import {applyMacroSaga} from '../desk-agent-case-detail/states';
import {macroList} from '../../data/macros';

export const rootReducer = storage.reducer(combineReducers({
  router,
  entities: entitiesReducer,
  deskAgentCaseMacros: macroFilter,
  caseStore,
  filterStore
}), merger);
