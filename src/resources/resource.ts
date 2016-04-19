import {createSelector} from 'reselect';
import {Store, Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import { normalize, Schema, arrayOf } from 'normalizr';

import {ngRedux, Middleware} from 'ng-redux';
import {IResourceAdapter, IResourceRequestConfig, IEntityState, EntityState} from './interfaces';

import {find} from './actions/find';
import {action} from './actions/action';

import {flattenEmbedded} from './utils';

// ACTION TYPES
export const FIND_ONE = "FIND_ONE";
export const FINDING_ONE = "FINDING_ONE";
export const FOUND_ONE = "FOUND_ONE";
export const FIND = "FIND";
export const FINDING = "FINDING";
export const FOUND = "FOUND";
export const ADD = "ADD";
export const ADDING = "ADDING";
export const ADDED = "ADDED";
export const DELETE = "DELETE";
export const DELETING = "DELETING";
export const DELETED = "DELETED";
export const PATCH = "PATCH";
export const PATCHING = "PATCHING";
export const PATCHED = "PATCHED";
export const UPDATE = "UPDATE";
export const UPDATING = "UPDATING";
export const UPDATED = "UPDATED";
export const REFRESH = "REFRESH";
export const REFRESHING = "REFRESHING";
export const REFRESHED = "REFRESHED";
export const ERROR = "ERROR";

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
        case `${FINDING}_${type}`:         // LOADING_MANY
          return Object.assign(s, {loadingMany: true});
        case `${FINDING_ONE}_${type}`:          // LOADING_ONE
          return Object.assign(s, {loadingOne: true});
        case `${DELETING}_${type}`:             // DELETING
          return Object.assign(s, {deleting: true});
        case `${PATCHING}_${type}`:             // PATCHING
          return Object.assign(s, {patching: true});
        case `${ADDING}_${type}`:               // ADDING
          return Object.assign(s, {adding: true});
        
        // LOAD_MANY_CASE
        case t(FIND, type): // LOAD_MANY_CASE
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
  
  /**
   * Lifecycle Hooks:
   * 
   * * `beforeCreate(payload[, cb])`
   * * `afterCreate(payload[, cb])`
   */
  add(payload: T): Action<T> {
    return action<T>(ADD, this.className, payload);
  }
  
  /**
   * Lifecycle Hooks:
   * 
   * * `beforeUpdate(payload[, cb])`
   * * `afterUpdate(payload[, cb])`
   */
  update(payload: T): Action<T> {
    return action<T>(UPDATE, this.className, payload);
  }
  
  /**
   * Saves data. Will determine whether to create or update.
   * 
   * For Lifecycle hooks, see `create` or `update`.
   */
  save(payload: T): Action<T> {
    return action<T>(ADD, this.className, payload);
  }
  
  /**
   * Deletes an item from the store.
   * 
   * * `beforeDelete(payload[, cb])`
   * * `afterDelete(payload[, cb])`
   */
  delete(payload: T): Action<T> {
    return action<T>(DELETE, this.className, payload);
  }
  
  /**
   * Finds items and puts them into the store.
   * 
   * * `beforeFindMany(payload[, cb])`
   * * `afterFindMany(payload[, cb])`
   */
  find(args?: IResourceRequestConfig): Promise<any> {
    return this.store.dispatch(find(this, args));
  }
  
  findOne(id: number): Action<number> {
    return action<number>(FIND_ONE, this.className, id);
  }
  
  patch(payload: T): Action<T> {
    return action<T>(PATCH, this.className, payload);
  }
  
  reloadMany(): void {
    this.store.dispatch(action(REFRESH, this.className, []))
    this.find();
  }
  

  
}
