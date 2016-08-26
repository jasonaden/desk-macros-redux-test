import {Action} from 'flux-standard-action';
import * as Immutable from 'immutable';

import {Resource, defaultReducer, defaultListReducer} from 'restore';
import { uiResource } from './uiResource';
import { IPersistorConfig, IAdapterConfig } from '../../../restore';
import {caseSchema} from './config/schemas';
import {ApiV2Adapter} from './config/apiv2-adapter';

/**
 * Module name
 */
export const CLASS_NAME = "CASE";

// Case _link items
const relateds = {
  customer: {
      className: 'User'
  },
  assigned_user: {
      className: 'user',
      schemaName: 'user'
  },
  user: {
      className: 'user',
      schemaName: 'user'
  },  
  notes: {
      className: 'note',
      listSchemaName: "NOTESLIST" 
  },
  labels: {
    className: 'label',
    listSchemaName: "LABELSLIST"
  }
}


export class Case extends uiResource {
  public url = '/api/v2/cases';
  public className = CLASS_NAME.toLowerCase();
  public type = CLASS_NAME.toLowerCase();
  public relateds = relateds;
  
  constructor(public $ngRedux, ApiV2Adapter, $injector) {
    super($ngRedux, ApiV2Adapter, $injector);
  }

/*** 
 * Interface for backend data store interactions
 *  
 */
  beforeAdd(payload, persistorConfig: IPersistorConfig, adapterConfig: IAdapterConfig): Array<any> {
    persistorConfig.url = this.url;
    persistorConfig.data = payload;
    return [persistorConfig, adapterConfig];
  }

  beforeFindOne(id, persistorConfig?: IPersistorConfig): Array<any> {
    persistorConfig.url = persistorConfig.url || this.url + '/' + id;
    return [persistorConfig];
  }

  beforeUpdate(id, patch, persistorConfig: IPersistorConfig, adapterConfig: IAdapterConfig): Array<any> {
    persistorConfig.url = this.url + '/' + id;
    persistorConfig.data = patch;
    return [persistorConfig, adapterConfig];
  }

  beforeDestroy(id, persistorConfig: IPersistorConfig, adapterConfig: IAdapterConfig): Array<any> {
    persistorConfig.url = this.url + '/' + id;
    return [persistorConfig, adapterConfig];
  }

  // TODO: May be able to get rid of this and just use find().
  // Gets the default list of cases
  list(persistorConfig: IPersistorConfig = {}, adapterConfig: IAdapterConfig = {}): PromiseLike<any> {
    persistorConfig = Object.assign(
      {url: this.url, params: {embed: 'customer'}}, 
      persistorConfig
    )
    adapterConfig = Object.assign(
      {uri: this.url, schemaName: 'CASELIST'},
      adapterConfig
    )
    return this.find( persistorConfig, adapterConfig );
  }

  changes(persistorConfig: IPersistorConfig = {}, adapterConfig: IAdapterConfig= {}) {
    adapterConfig.listName = CHANGES;
    persistorConfig = Object.assign({}, {url:'filters/11/cases/changes?cflpt=1471022097&cids=&embed=customer&filter_id=11&page=1&per_page=50&sort_direction=desc&sort_field=updated_at'}, persistorConfig)
    return this.find(persistorConfig, adapterConfig);
  }

  /***** 
   * Synchronous interface for Redux store
   * 
   *  All methods in the synch interface return synchronous data by directly
   *  selecting from the server store.
  * */

  /***** 
   * Asynchronous interface 
   * 
   * All methods in the asych interface return promises. They are used to 
   * populate the server store or to combine populating the server store
   * with synchronously requesting the data put into the server store.
  **/

}

export const APPLY_MACRO = 'APPLY_MACRO';
export const MACRO_APPLY_ERROR = 'MACRO_APPLY_ERROR';
export function applyMacro (payload: Object): Action<Object> {
  return {
    type: APPLY_MACRO, 
    payload
  };
}



