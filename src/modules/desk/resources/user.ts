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
export const CLASS_NAME = "USER";

export class User extends uiResource {
  public url = '/api/v2/users';
  public className = CLASS_NAME.toLowerCase();
  
  private defaultConfig;

  constructor(public $ngRedux, ApiV2Adapter) {
    super($ngRedux, ApiV2Adapter);
  }

  beforeFindOne(id, persistorConfig: IPersistorConfig): Array<any> {
    persistorConfig.url = this.url + '/' + id;
    return [persistorConfig];
  }

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
      {uri: this.url, schemaName: 'USERLIST'},
      adapterConfig
    )
    return this.find( persistorConfig, adapterConfig );
  }
  
}