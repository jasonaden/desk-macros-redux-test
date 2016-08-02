import {
  Case, 
  Customer,
  ApiV2Adapter
} from './resources';

import '../desk-agent/module';
import '../desk-agent-case/module';
import '../desk-agent-case-detail/module';
import '../desk-agent-case-list/module';
import '../desk-agent-case-macros/module';
import '../../resources/module';
import * as comp from './components';
import {routes} from './config/routes';
import {ReduxWatch} from './services/ReduxWatch';
import {RxPollerFactory} from './services/RxPoller';
import {rootReducer} from './states';
import {combineReducers} from 'redux';
import {router} from 'redux-ui-router';
import {applyMiddleware} from 'redux';
import {ngRedux, Middleware} from 'ng-redux';
import * as thunk from 'redux-thunk';
import * as createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {failedToApplySaga, setMacros} from '../desk-agent-case-macros/states';
import {applyMacroSaga} from '../desk-agent-case-detail/states';
import {macroList} from '../../data/macros';

// export const DeskStore:Store = createStore(rootReducer);
export const deskMod = angular.module('desk', [
  'desk.agent', 
  'desk.agent.case', 
  'desk.agent.case.list', 
  'desk.agent.case.macros', 
  'desk.agent.case.detail',
  'rx',
  'ds.resources'
]);

deskMod.config($ngReduxProvider => {

  const store = $ngReduxProvider.createStoreWith(
    rootReducer,
    [
      thunk, 
      createLogger(), 
      'ngUiRouterMiddleware', 
      createSagaMiddleware(applyMacroSaga, failedToApplySaga)
    ]
  );
})
.run(($ngRedux) => {
  $ngRedux.dispatch(setMacros(macroList));
});

deskMod
  .config(routes)
  .provider('autoSaveFormDefaults', comp.autoSaveFormProvider)
  .directive('autoSaveForm', comp.autoSaveForm.factory())
  .directive('autoSaveFormProperty', comp.autoSaveFormProperty.factory())
  .component('filterList', comp.FilterListComponent)
  .component('filterListSelector', comp.FilterListSelectorComponent)
  .component('filterListFilter', comp.FilterListFilterComponent)
  .component('testArea', comp.TestAreaComponent)
  .component('desk', comp.DeskComponent)
  .factory('RxPoller', RxPollerFactory)
  .service('ReduxWatch', ReduxWatch)
  .service('Case', Case)
  .service('Customer', Customer)
  .service('ApiV2Adapter', ApiV2Adapter);

