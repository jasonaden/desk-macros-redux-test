
import * as ng from 'angular';

import {Store} from 'redux';
import {
  IResourceAdapter, 
  IPersistor, 
  BaseAdapter, 
  flattenEmbedded, 
  $httpPersistor
} from 'restore';

/*
* Base Adapter for an API
*/
export class ApiV2Adapter extends BaseAdapter {

  // Base URL for the API
  public baseUrl: string = 'http://localhost:8888/api/v2';

  static generateSlug = function (entity) {
    let key = (entity._links && entity._links.self && entity._links.self.href) || entity.id;
    if (!key) {
      return;
    }
    if (key.indexOf('/api/v2') == 0) {
      key = key.slice(7)
    }
    return key;
  }
  
  constructor (schema: Object, store: Store, persistor?: IPersistor) {
    super(schema, store, persistor || new $httpPersistor());
  }

 
  afterFind(data) {
    let entries = data._embedded.entries;
    let count = data.total_entries;
    let page = data.page;

    for(let i in entries) {
      this.store.dispatch({type:'SET_ONE_'+this.schema._key.toUpperCase(), payload: entries[i]});
    }

    return data;
  }

  generateSlug (entity: any) {
    return ApiV2Adapter.generateSlug(entity);
  }

}