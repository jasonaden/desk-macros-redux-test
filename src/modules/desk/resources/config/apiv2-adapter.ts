
import * as ng from 'angular';

import {Store} from 'redux';
import {normalize} from 'normalizr';
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
    /*if (key.indexOf('/api/v2') == 0) {
      key = key.slice(7)
    }*/
    return key;
  }
  
  constructor (schema: Object, store: Store, persistor?: IPersistor) {
    super(schema, store, persistor || new $httpPersistor());
  }

  handleAdapterData( split ) {
    for( let key of Object.getOwnPropertyNames(split.entities) ) {
      let entity = split.entities[key];
      for (let eKey of Object.getOwnPropertyNames(entity)) {
        this.store.dispatch( {type: 'SET_ONE_'+ key.toUpperCase(), payload: entity[eKey]});
      }
    }
  }

  splitSchema( data ): Promise<any[]> {
    // if we recieve a single item
    let type = (data._links && data._links.self.class) || undefined;

    // Specify the schema for other types of things
    if( ! type ) {
      // schema for /api/v2/changes
      if( data.changed ) {
        type = 'changes'
      }
    }

    // Reject if no schema match
    if( ! this.schema[type] ) {
      Promise.reject(`No schema exists for: ${type}`)
    }

    let split = normalize( data, this.schema[type] )   
    
    this.handleAdapterData(split);

    return Promise.all([split]); 
  }

  afterUpdate(data) {
    this.splitSchema( data );

    return data;
  }

  afterFindOne(data) {
    this.splitSchema( data )
    return data;
  }
 
  afterFind(data, adapterConfig) {
    if ( data.changed ) {

      let positions = data.positions;
      let split = normalize( data, this.schema[adapterConfig.listName] );
      delete split.entities[adapterConfig.listName];
      this.handleAdapterData(split);

      /*let uris = []
      positions.map( (p) => {
        uris.push(getURI(getCaseById(p)));
      });*/

      this.store.dispatch({type: 'SET_LIST_PAGE_'+adapterConfig.listName.toUpperCase(), payload: 1});
      this.store.dispatch({type: 'SET_LIST_RESULT_'+adapterConfig.listName.toUpperCase(), payload: positions});

      return data;
    } else {

      let entries = data._embedded.entries;

      let count = data.total_entries;
      let page = data.page;

      // store relevant entities
      let split = normalize( data, this.schema[adapterConfig.listName] );

      // get result id sequence
      let result = split.entities[adapterConfig.listName][adapterConfig.listName]._embedded.entries;
      delete split.entities[adapterConfig.listName];
      
      this.handleAdapterData(split);

      // push meta into list store
      this.store.dispatch({type: 'SET_LIST_COUNT_'+adapterConfig.listName.toUpperCase(), payload: count});
      this.store.dispatch({type: 'SET_LIST_PAGE_'+adapterConfig.listName.toUpperCase(), payload: page});
      this.store.dispatch({type: 'SET_LIST_RESULT_'+adapterConfig.listName.toUpperCase(), payload: result});

      return data;
    }
  }

  generateSlug (entity: any) {
    return ApiV2Adapter.generateSlug(entity);
  }

}