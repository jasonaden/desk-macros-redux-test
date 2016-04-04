import {createSelector} from 'reselect';
import {Store, Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import { normalize, Schema, arrayOf } from 'normalizr';

import {ngRedux, Middleware} from 'ng-redux';
import {IResourceAdapter, IResourceRequestConfig} from './resource-adapter';

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
  $q: ng.IQService;
  public store: Store;
  
  constructor($injector, public adapter: IResourceAdapter, private _actions: IActions) {
    this.store = $injector.get('$ngRedux');
    this.$http = $injector.get('$http');
    this.$q = $injector.get('$q');
  }
  
  static isLoading (id?: string | number) {
    // Check by ID
    if (id) {
      
    // Check loading for all instances of this type (e.g. all Cases)
    } else {
      
    }
    return false;
  }
  
  add(payload: T): Action<T> {
    return {type: this._actions.add, payload};
  }
  
  delete(payload: T): Action<T> {
    return {type: this._actions.delete, payload};
  }
  
  loadMany(args?: IResourceRequestConfig): Promise<any> {
    
    return this.store.dispatch(this._loadMany(args));
  }
  
  private _loadMany (args?: IResourceRequestConfig) {
    return (dispatch, store) => {
      dispatch(action(this._actions.loadingMany));
      
      // return this.$http.get(this.baseUrl + this.url)
      return this.adapter.execute({
        url: this.url, 
        baseUrl: this.baseUrl, 
        method: 'GET',
        // TODO: This needs to be abstracted, but for now putting interceptor straight in here
        // Not sure if we want to do this type of transformation or if we should just map 
        // straight to the HAL... probably do this transformation. To try the alternative
        // way go to ./schemas.ts and switch the schema mapping.
        transformResponse: function flattenEmbedded (data, headers) {
          if (!data) return data;
          if (Array.isArray(data)) {
            return data.map((flatten));
          } else {
            return flatten(data);
          }
          
          function flatten (data) {
            if (data._embedded) {
              for (let key in data._embedded) {
                data[key] = data._embedded[key];
              }
            }
            return data;
          }
        }})
      .then(
        res => {
          dispatch(action(this._actions.loadMany, res.data));
          return res.data;
        },
        error => {
          dispatch(action("ERROR", error));
          return this.$q.reject(error);
        }
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
