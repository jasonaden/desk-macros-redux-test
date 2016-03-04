import {ngRedux, applyMiddleware} from 'ng-redux';
import createSagaMiddleware from 'redux-saga';
import * as createLogger from 'redux-logger';

import {setMacros} from '../desk-agent-case-macros/states';
import {setCases, applyMacro} from '../desk-agent-case/states';
import {failedToApply} from '../desk-agent-case-macros/states';
import {mixPanel} from './states';

import '../desk-agent/module';
import '../desk-agent-case/module';
import '../desk-agent-case-detail/module';
import '../desk-agent-case-list/module';
import '../desk-agent-case-macros/module';
import * as comp from './components';
import {routes} from './config/routes';

import {rootReducer} from './states';

// pre-load from fixture data
import {macroList} from '../../data/macros';
import {caseList} from '../../data/cases';

// export const DeskStore:Store = createStore(rootReducer);
export const deskMod = angular.module('desk', [
  'desk.agent', 
  'desk.agent.case', 
  'desk.agent.case.list', 
  'desk.agent.case.macros', 
  'desk.agent.case.detail'
]);

const middlewares = [
  createSagaMiddleware(applyMacro, failedToApply, mixPanel)
];
// add logger only for dev
const logger = createLogger();
middlewares.push(logger);

deskMod.config($ngReduxProvider => {
  $ngReduxProvider.createStoreWith(
    rootReducer,
    middlewares
  );
})
.run(($ngRedux) => {
  $ngRedux.dispatch(setMacros(macroList));
  $ngRedux.dispatch(setCases(caseList));
});

deskMod
  .config(routes)
  .component('filterList', comp.FilterListComponent)
  .component('filterListSelector', comp.FilterListSelectorComponent)
  .component('filterListFilter', comp.FilterListFilterComponent)
  .component('desk', comp.DeskComponent);

