import {createSelector} from 'reselect';
import {Store, Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import { normalize, Schema, arrayOf } from 'normalizr';

import {ngRedux, Middleware} from 'ng-redux';
import {IResourceAdapter} from './resource-adapter';

export interface IActions {
  loadingMany: string,
  loadedMany: string,
  loadingOne: string,
  loadedOne: string,
  adding: string,
  added: string,
  deleting: string,
  patching: string,
  patched: string,
  loadMany: string,
  loadOne: string,
  add: string,
  delete: string,
  patch: string,
  reloadMany: string,
  reloadOne: string
};

function action<T> (type: string, payload?: any): Action<T> {
  return {type, payload};
}

export class Resource<T> {
  loading: boolean;
  url: string;
  baseUrl: string = 'http://localhost:8888';
  $http: ng.IHttpService;
  public store: Store;
  
  constructor($injector, public adapter: IResourceAdapter, private _actions: IActions) {
    this.store = $injector.get('$ngRedux');
    this.$http = $injector.get('$http');
  }
  
  add(payload: T): Action<T> {
    return {type: this._actions.add, payload};
  }
  
  delete(payload: T): Action<T> {
    return {type: this._actions.delete, payload};
  }
  
  loadMany(args?: Object): Action<void> {
    return this.store.dispatch(this._loadMany(args));
  }
  
  private _loadMany (args?: Object) {
    return (dispatch, store) => {
      dispatch(action(this._actions.loadingMany));
      
      // return this.$http.get(this.baseUrl + this.url)
      return this.adapter.execute({url: this.url, baseUrl: this.baseUrl, method: 'GET'})
      .then(
        items => dispatch(action(this._actions.loadMany, items.data)),
        error => dispatch(action("ERROR", error))
      );
    }
  }
  
  loadOne(id: number): Action<number> {
    return {type: this._actions.loadOne, payload: id};
  }
  
  patch(payload: T): Action<T> {
    return {type: this._actions.patch, payload};
  }
  
  reloadMany(): void {
    this.store.dispatch({type: this._actions.reloadMany, payload: []})
    this.loadMany();
  }
  
  
  
}
