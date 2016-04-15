import {createSelector} from 'reselect';
import {Store, Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import { normalize, Schema, arrayOf } from 'normalizr';

import {ngRedux, Middleware} from 'ng-redux';
import {IResourceAdapter, IResourceRequestConfig} from './interfaces';

import {flattenEmbedded} from './utils';

// ACTION TYPES
export const LOAD_ONE = "LOAD_ONE";
export const LOADING_ONE = "LOADING_ONE";
export const LOADED_ONE = "LOADED_ONE";
export const LOAD_MANY = "LOAD_MANY";
export const LOADING_MANY = "LOADING_MANY";
export const LOADED_MANY = "LOADED_MANY";
export const ADD = "ADD";
export const ADDING = "ADDING";
export const ADDED = "ADDED";
export const DELETE = "DELETE";
export const DELETING = "DELETING";
export const DELETED = "DELETED";
export const PATCH = "PATCH";
export const PATCHING = "PATCHING";
export const PATCHED = "PATCHED";
export const REFRESH = "REFRESH";
export const REFRESHING = "REFRESHING";
export const REFRESHED = "REFRESHED";
export const ERROR = "ERROR";

function action<T> (type: string, suffix: string, payload?: any): Action<T> {
  return {type: `${type}_${suffix}`, payload};
}

/**
 * 
 */
export class Resource<T> {
  
  public url: string;
  public baseUrl: string;
  public className: string;
  
  public store: Store;
  
  public $http: ng.IHttpService;
  public $q: ng.IQService;
  
  private _loading: boolean;
  
  /**
   * The Resource class is designed to be extended, rather than instantiated on its own.
   * Because it's extended, Angular's DI system will not pick up on the constructor 
   * arguments, so anything Resource needs must be passed in. This is why the first 
   * argument is `$injector` so the Resource can grab the services it needs.
   * 
   * @param $injector $injector   Angular's injector. Inject this into the parent class 
   *                              constructor and pass to the super() call.
   * @param adapter adapter       The ResourceAdapter instance to use in this Resource.
   * @param schema Schema         The Normalizr schema to use when parsing API data 
   *                              returned for this Resource.
   */
  constructor($injector, public adapter: IResourceAdapter, public schema: Schema) {
    this.store = $injector.get('$ngRedux');
    this.$http = $injector.get('$http');
    this.$q = $injector.get('$q');
  }
    
  // TODO: ADD METHODS TO GET DATA OUT OF THE RESOURCE.
  
  
  /**
   * Check whether this resource type is loading or optionally a specific resource.
   * 
   * Example:
   * 
   * ```
   * Case.isLoading(); // Checks whether loadMany is being run
   * 
   * Case.isLoading(5); // Checks whether we are fetching a specific case
   * ```
   */
  static isLoading (id?: string | number) {
    // Check by ID
    if (id) {
      return false;
    // Check loading for all instances of this type (e.g. all Cases)
    } else {
      return false;
    }
  }
    
  /**
   * Generic reducer for items of any type (entities). Will automatically
   * replace existing items in the state tree with the items being loaded
   */
  static itemsReducer (type: string): Reducer {
    return (state:Object[] = [], action: Action<Object[]>) => {
      switch (action.type) {
        // LOAD_MANY_CASE
        case `${LOAD_MANY}_${type}`:
          return action.payload.slice(0);
        default:
          return state;
      }
    } 
  }
  
  /**
   * Single item reducer. Used for adding or updating a single entity
   * in the state tree.
   */
  static itemReducer (type: string): Reducer {
    return (state: Object = {}, action: Action<any>) => {
      switch (action.type) {
        // ADD_CASE
        case `${ADD}_${type}`:
          return Object.assign({}, action.payload);
        default:
          return state;
      }
    } 
  }
  
  add(payload: T): Action<T> {
    return action<T>(ADD, this.className, payload);
  }
  
  delete(payload: T): Action<T> {
    return action<T>(DELETE, this.className, payload);
  }
  
  loadMany(args?: IResourceRequestConfig): Promise<any> {
    return this.store.dispatch(this._loadMany(args));
  }
  
  private _loadMany (args?: IResourceRequestConfig) {
    return (dispatch, store) => {
      dispatch(action(LOADING_MANY, this.className));
      
      return this.adapter.execute({
        url: this.url, 
        method: 'GET',
        transformResponse: flattenEmbedded})
      .then(
        res => {
          dispatch(action(LOAD_MANY, this.className, res.data));
          return res.data;
        },
        error => {
          dispatch(action(ERROR, this.className, error));
          return this.$q.reject(error);
        }
      );
    }
  }
  
  loadOne(id: number): Action<number> {
    return action<number>(LOAD_ONE, this.className, id);
  }
  
  patch(payload: T): Action<T> {
    return action<T>(PATCH, this.className, payload);
  }
  
  reloadMany(): void {
    this.store.dispatch(action(REFRESH, this.className, []))
    this.loadMany();
  }
  

  
}
