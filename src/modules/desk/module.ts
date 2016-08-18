import {
  Case,
  Customer,
  ApiV2Adapter,
  User
} from './resources';
import {
  appSchema
} from './resources/config/schemas';

import {$httpPersistor, $httpPersistorConfig} from 'restore';

import '../desk-agent/module';
import '../desk-agent-case/module';
import '../desk-agent-case-detail/module';
import '../desk-agent-case-list/module';
import '../desk-agent-case-macros/module';
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
  'rx'
]);

// NOTE: I have an updated version of Saga which 
//  requires doing this differently. To run for now
//  you could revert this section. 
const sagaMiddleware = createSagaMiddleware()

deskMod.config($ngReduxProvider => {

  const store = $ngReduxProvider.createStoreWith(
    rootReducer,
    [
      thunk,
      createLogger(),
      'ngUiRouterMiddleware',
      sagaMiddleware
    ]
  );
})
.run(($ngRedux) => {
  $ngRedux.dispatch(setMacros(macroList));
  sagaMiddleware.run(applyMacroSaga, failedToApplySaga)

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
  .service('User', User)
  .provider('$httpPersistor', () => {
    return {
      $get: ($http, $q) => {
        $httpPersistor.setHttp($http);
        $httpPersistor.setQ($q);
        return new $httpPersistor(new $httpPersistorConfig({baseUrl: 'http://localhost:8888/api/v2'}));
      }
    };
  })
  .provider('ApiV2Adapter', () => {
    return {
      $get: ($ngRedux, $httpPersistor) => {
        return new ApiV2Adapter(appSchema, $ngRedux, $httpPersistor);
      }
    };
  });
