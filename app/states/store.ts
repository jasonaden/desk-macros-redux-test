// Library


// import { createStore, applyMiddleware, Store, Reducer} from 'redux';
// import createLogger from 'redux-logger';
// const logger = createLogger();
// const createStoreWithMiddleware = applyMiddleware(logger)(createStore);


import {Reducer, Store, createStore} from '@ngrx/store';

// Reducers
import {rootReducer} from './macroFilter/reducers';

export const AppStore:Store<Object> = createStore(rootReducer).useValue;


