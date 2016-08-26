import {Action} from 'flux-standard-action';
import * as Immutable from 'immutable';

import {Resource, defaultReducer, defaultListReducer} from 'restore';
import { IPersistorConfig, IAdapterConfig } from '../../../restore';
import {userSchema} from './config/schemas';
import {ApiV2Adapter} from './config/apiv2-adapter';
import {uiResource} from './uiResource';

/**
 * Module name
 */
export const NAME = "LABEL";

export class Label extends uiResource {
  public url = '/api/v2/labels';
  public className = NAME.toLowerCase();
  
  private defaultConfig;

  constructor(public $ngRedux, ApiV2Adapter) {
    super($ngRedux, ApiV2Adapter);

    this.defaultConfig = {
      url: this.url
    }
  }

  beforeFindOne(caseId, id, persistorConfig: IPersistorConfig): Array<any> {
    persistorConfig.url = this.url + '/' + caseId + '/labels/' + id;
    return [persistorConfig];
  }

  // TODO: Confirm the URL for updating a note and fix this
  beforeUpdate(id, patch, persistorConfig: IPersistorConfig, adapterConfig: IAdapterConfig): Array<any> {
    persistorConfig.url = this.url + '/' + id;
    persistorConfig.data = patch;
    return [persistorConfig, adapterConfig];
  }

  list(persistorConfig: IPersistorConfig = {}, adapterConfig: IAdapterConfig = {}): PromiseLike<any> {
    persistorConfig = Object.assign(
      {url: this.url}, 
      persistorConfig
    )
    adapterConfig = Object.assign(
      {uri: this.url, schemaName: 'LABELLIST'},
      adapterConfig
    )
    return this.find( persistorConfig, adapterConfig );
  }

}

export const LabelReducer = defaultReducer(NAME);
// export const NoteListReducer = defaultListReducer(LIST);
// export const getUsers = (state) => {
//   if (state.lists[LIST].page && state.lists[LIST].result.get(state.lists[LIST].page)){
//     return state.lists[LIST].result.get(state.lists[LIST].page).map( (r) => {
//       return getUserByURI(state, r);
//     });
//   } else {
//     return Immutable.List();
//   }
// }


// export const getUserById = (state, id) => {
//   return state.entities.user.items.find((user) => user.get('id') == id);
// }

// export const getUserByURI = (state, id) => {
//   return state.entities.user.items.get(id);
// }

