// Library
import {Injectable} from 'angular2/core';
import { createStore, applyMiddleware, Store, Reducer} from 'redux';
import createLogger from 'redux-logger';

// Reducers
import {rootReducer} from './macroFilter/reducers';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

export const AppStore = createStoreWithMiddleware(rootReducer);


