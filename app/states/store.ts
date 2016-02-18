// Library
import {Injectable} from 'angular2/core';
import { createStore, applyMiddleware, Store, Reducer} from 'redux';
import createLogger from 'redux-logger';

// Reducers
import {rootReducer} from './macroFilter/reducers';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

export const store = createStoreWithMiddleware(rootReducer);

// Export the app store
@Injectable()
export class AppStore implements Store {
  getReducer: () => Reducer;
  replaceReducer: (nextReducer: Reducer) => void;
  dispatch: (action: any) => any;
  getState: () => any;
  subscribe: (listener: Function) => Function;
  constructor () {
    return store;
  }
}


