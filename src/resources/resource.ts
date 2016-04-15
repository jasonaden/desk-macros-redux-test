import {createSelector} from 'reselect';
import {Store, Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import { normalize, Schema, arrayOf } from 'normalizr';

import {ngRedux, Middleware} from 'ng-redux';
import {IResourceAdapter, IResourceRequestConfig, IEntityState, EntityState} from './interfaces';

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
  
  get state (): IEntityState {
    return this._state[this.className.toLowerCase()] || {};
  };
  
  private get _state () {
    return this.store.getState().entities || {};
  }
  
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
  public isLoading (id?: string | number) {
    // Check by ID
    if (id) {
      return false;
    // Check loading for all instances of this type (e.g. all Cases)
    } else {
      let s = this.state;
      return !!(s.adding || s.deleting || s.loadingMany || s.loadingOne || s.patching);
    }
  }
    
  /**
   * Generic reducer for items of any type (entities). Produces a state tree like:
   * 
   * ```
   *  entities = {
   *    cases: {
   *      // sequence of cases as returned from most recent API call
   *      result: [6, 3, 5, ...],
   *      loadingMany: true,
   *      loadingOne: true,
   *      deleting: false,
   *      patching: false,
   *      adding: false,
   *      items: {
   *        3: {...},
   *        5: {...},
   *        6: {...},
   *        ...
   *      },
   *      meta: {
   *        count: 100,
   *        page: 2,
   *        links: {
   *          ...
   *        }
   *      }
   *    }
   *  }
   * ```
   */
  static reducer<T> (type: string): Reducer {
    /**
     * Simple function for concatinating the type const with the type value.
     * 
     * ```
     *  t("LOADING_SOMETHING", "CASE"); // returns LOADING_SOMETHING_CASE
     * ``` 
     */
    function t (str: string, type: string): string {
      return str + '_' + type;
    }
    
    return (state: IEntityState = EntityState(), action: any) => {
      let s = Object.assign({}, state);
      switch (action.type) {
        // SETUP ACTIONABLE ITEMS
        case `${LOADING_MANY}_${type}`:         // LOADING_MANY
          return Object.assign(s, {loadingMany: true});
        case `${LOADING_ONE}_${type}`:          // LOADING_ONE
          return Object.assign(s, {loadingOne: true});
        case `${DELETING}_${type}`:             // DELETING
          return Object.assign(s, {deleting: true});
        case `${PATCHING}_${type}`:             // PATCHING
          return Object.assign(s, {patching: true});
        case `${ADDING}_${type}`:               // ADDING
          return Object.assign(s, {adding: true});
        
        // LOAD_MANY_CASE
        case t(LOAD_MANY, type): // LOAD_MANY_CASE
          // Turn off loading indicator
          s.loadingMany = false;
          
          // Apply the sequenced result array
          s.result = action.payload.result.slice(0);
          
          // Iterate results and add each item
          s.items = Object.assign({}, s.items);
          s.result.forEach((key) => {
            s.items[key] = action.payload.items[key];
          });
          
          // Apply metadata
          s.meta = Object.assign({}, action.payload.meta);
          
          return s;
        // LOAD_MANY_CASE
        case t(ADD, type): // ADD_SOMETHING
          s.items = Object.assign({}, s.items);
          s.items[action.payload._links.self.href] = action.payload;
          return s;
        // TODO: ERROR CASE
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
        method: 'GET'
      })
      .then(
        res => {
          dispatch(this._splitSchema(this.schema, this.className, res.data));
          return res.data;
        },
        error => {
          dispatch(action(ERROR, this.className, error));
          return this.$q.reject(error);
        }
      );
    }
  }
  
  private _splitSchema (schema, name: string, data) {
    return (dispatch, store) => {
      let normalized = normalize(data.entries, arrayOf(schema));
      // This is for testing only
      if (normalized.result[0] === undefined) {
        normalized.result.length = 0;
      }
      // Dispatch event for the main data that was gathered on this request.
      // This includes metadata about the collection.
      dispatch(action(LOAD_MANY, name.toUpperCase(), {
        result: normalized.result,
        items: normalized.entities[name.toLowerCase()],
        meta: {
          count: data.total_entries,
          page: data.page,
          links: data._links
        }
      }));
      
      // Iterate over other objects that were returned (normalized) and 
      // dispatch add actions for them to get them into the store.
      for (let x in normalized.entities) {
        // Exclude main entity
        if (x.toUpperCase() !== name.toUpperCase()) {
          // Iterate over each object passed back and dispatch ADD action
          for (let y in normalized.entities[x]) {
            dispatch(action(ADD, x.toUpperCase(), normalized.entities[x][y]));
          }
        }
      }
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
