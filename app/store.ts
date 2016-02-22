// Library


// import { createStore, applyMiddleware, Store, Reducer} from 'redux';
// import createLogger from 'redux-logger';
// const logger = createLogger();
// const createStoreWithMiddleware = applyMiddleware(logger)(createStore);


import {Store, createStore} from '@ngrx/store';

// Reducers
import {rootReducer} from './rootReducer';

export const AppStore:Store<Object> = createStore(rootReducer).useValue;


