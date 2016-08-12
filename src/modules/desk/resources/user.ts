import {Action} from 'flux-standard-action';
import * as Immutable from 'immutable';

import {Resource, defaultReducer, defaultListReducer} from 'restore';
import {userSchema} from './config/schemas';
import {ApiV2Adapter} from './config/apiv2-adapter';

/**
 * Module name
 */
export const NAME = "USER";
const LIST = "USERLIST";

export class User extends Resource<any> {
  public url = '/users';
  public className = NAME;
  
  private defaultConfig;

  constructor(public $ngRedux, ApiV2Adapter) {
    super($ngRedux, ApiV2Adapter);

    this.defaultConfig = {
      url: this.url
    }
  }

  getDefaultConfig (id, config) {
    return {
      url: this.url + '/' + id,
      className: this.className 
    };
  }

  beforeFindOne(id, persistorConfig = {}) {
    persistorConfig.url = this.url + '/' + id;
    return [persistorConfig];
  }

  beforeUpdate(id, patch, config = {}) {
    config = this.getDefaultConfig(id, config);
    config.data = patch;
    return config;
  }

  list(persistorConfig = {}, adapterConfig = {}) {
    adapterConfig.listName = LIST;
    persistorConfig = Object.assign({}, {url:this.url}, persistorConfig)
    return this.find(persistorConfig, adapterConfig);
  }
  
}

export const UserReducer = defaultReducer(NAME);
export const UserListReducer = defaultListReducer(LIST);
export const getUsers = (state) => {
  if (state.lists[LIST].page && state.lists[LIST].result.get(state.lists[LIST].page)){
    return state.lists[LIST].result.get(state.lists[LIST].page).map( (r) => {
      return getUserById(state, r);
    });
  } else {
    return Immutable.List();
  }
}


export const getUserById = (state, id) => {
  return state.entities.user.items.find((user) => user.get('id') == id);
}

export const getUserByURI = (state, id) => {
  return state.entities.case.items.get(id);
}

