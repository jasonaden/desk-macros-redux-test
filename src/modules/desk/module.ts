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
import * as Immutable from 'immutable';
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

const loggerConfig = {
  duration: true,
  diff: false
  /*
  ,stateTransformer: (state) => {
    let newState = {};

    // first level
    for (var i of Object.keys(state)) {
      if (Immutable.Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    };

    // second level
    for (var i of Object.keys(newState)) {
      for( var j of Object.keys(newState[i])) {
        if (Immutable.Iterable.isIterable(newState[i][j])) {
          newState[i][j] = state[i][j].toJS();
        } else {
          newState[i][j] = state[i][j];
        }
      }
    };
    
    return newState;
  }
  */
  
}

// The way to instantiate Saga changed at 0.10.x so it needs to be 
//  added as middleware first and then use run().
const sagaMiddleware = createSagaMiddleware();

deskMod.config($ngReduxProvider => {

  const store = $ngReduxProvider.createStoreWith(
    rootReducer,
    [
      thunk,
      'ngUiRouterMiddleware',
      sagaMiddleware,
      createLogger(loggerConfig)
    ]
  );
})
.run(($ngRedux) => {
  sagaMiddleware.run( applyMacroSaga, failedToApplySaga )
  $ngRedux.dispatch(setMacros(macroList));
});

deskMod
  .config(routes)
  .provider('autoSaveFormDefaults', comp.autoSaveFormDefaultsProvider)
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
