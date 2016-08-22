import {Action} from 'flux-standard-action';
import * as Immutable from 'immutable';

import {Resource, defaultReducer, defaultListReducer} from 'restore';
import { IPersistorConfig, IAdapterConfig } from '../../../restore';
import {userSchema} from './config/schemas';
import {ApiV2Adapter} from './config/apiv2-adapter';

/**
 * Module name
 */
export const NAME = "NOTE";
const LIST = "NOTELIST";

export class Note extends Resource {
  public url = '/cases';
  public className = NAME;
  
  private defaultConfig;

  constructor(public $ngRedux, ApiV2Adapter) {
    super($ngRedux, ApiV2Adapter);

    this.defaultConfig = {
      url: this.url
    }
  }

  // getDefaultConfig (caseId, id, config) {
  //   return {
  //     url: this.url + '/' + caseId + '/notes/' + id,
  //     className: this.className 
  //   };
  // }

  beforeFindOne(caseId, id, persistorConfig: IPersistorConfig): Array<any> {
    persistorConfig.url = this.url + '/' + caseId + '/notes/' + id;
    return [persistorConfig];
  }

  // TODO: Confirm the URL for updating a note and fix this
  beforeUpdate(id, patch, persistorConfig: IPersistorConfig, adapterConfig: IAdapterConfig): Array<any> {
    persistorConfig.url = this.url + '/' + id;
    persistorConfig.data = patch;
    return [persistorConfig, adapterConfig];
  }

  list(persistorConfig: IPersistorConfig = {}, adapterConfig: IAdapterConfig = {}) {
    adapterConfig.listName = LIST;
    persistorConfig = Object.assign({}, {url:this.url}, persistorConfig)
    return this.find(persistorConfig, adapterConfig);
  }
  
}

export const NoteReducer = defaultReducer(NAME);
export const NoteListReducer = defaultListReducer(LIST);
export const getUsers = (state) => {
  if (state.lists[LIST].page && state.lists[LIST].result.get(state.lists[LIST].page)){
    return state.lists[LIST].result.get(state.lists[LIST].page).map( (r) => {
      return getUserByURI(state, r);
    });
  } else {
    return Immutable.List();
  }
}


export const getUserById = (state, id) => {
  return state.entities.user.items.find((user) => user.get('id') == id);
}

export const getUserByURI = (state, id) => {
  return state.entities.user.items.get(id);
}

