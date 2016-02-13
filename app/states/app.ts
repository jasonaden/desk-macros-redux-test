// Library
import {Injectable} from 'angular2/core';
import { createStore, applyMiddleware, Store } from 'redux';
import createLogger from 'redux-logger';

// Reducers
import {rootReducer} from './macros/reducers';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

const store = createStoreWithMiddleware(rootReducer);

@Injectable()
export class AppStore implements Store{
  getReducer;
  replaceReducer;
  dispatch;
  getState;
  subscribe;
  constructor () {
    return store;
  }
}