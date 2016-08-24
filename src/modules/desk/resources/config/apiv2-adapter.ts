
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

  // TODO: The dispatch will need to change to make it generic as we're
  //  TODO: going to store resources keyed by just their uri
  // Put all the individual resources into the server store 
  handleAdapterData( split ) {
    // get each resource type
    for( let key of Object.getOwnPropertyNames(split.entities) ) {
      let entity = split.entities[key];
      // put each individual resource into the server store
      for (let eKey of Object.getOwnPropertyNames(entity)) {
        this.store.dispatch( {type: 'SET_ONE_'+ key.toUpperCase(), payload: entity[eKey]});
      }
    }
  }

  splitSchema( data, adapterConfig?: Object ): Promise<any[]> {
    // if we recieve a single item
    let type = (data._links && data._links.self.class) || undefined;

    // TODO: 8/24/16: looks like this is not used any more because
    //  'changes' should be handled as a list item
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

  afterFindOne(data, adapterConfig?: Object): PromiseLike<any[]> {
    console.log("data", data); 
    return this.splitSchema( data, adapterConfig )
  }
 
  afterFind(data, adapterConfig) {
    if ( data.changed ) {

      let positions = data.positions;
      let split = normalize( data, this.schema[adapterConfig.listName] );
      delete split.entities[adapterConfig.listName];
      this.handleAdapterData(split);

      this.store.dispatch({type: 'SET_LIST_PAGE_'+adapterConfig.listName.toUpperCase(), payload: 1});
      this.store.dispatch({type: 'SET_LIST_RESULT_'+adapterConfig.listName.toUpperCase(), payload: positions});

      return data;
    } else if (adapterConfig.listName) {

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
    } else {

      // grab the metadata  
      let count = data.total_entries;
      let page = data.page;

      let schemaName = adapterConfig.schemaName || 'GENERICLIST';

      /**  normalize the data return which results in: 
      *   * An object that looks like: 
      *     {
      *       page: <page #>,
      *       total_entries: <# total number of items>,
      *       _embedded: {
      *         entries: <array of list id's in order>
      *     }
      *   * An object for each type of resource keyed by the resources uri like: 
      *     { case: {
      *        '/api/v2/case/1': <case object>,
      *        '/api/v2/case/2': <case object>
      *       },
      *       customer: {
      *         '/api/v2/customer/3': <customer object>
      *         '/api/v2/customer/35': <customer object>
      *       }
      * *******/
      let split = normalize( data, this.schema[schemaName] );

      // get the array of ID's from the first object above
      let listArray = split.entities[schemaName][schemaName]._embedded.entries;
      delete split.entities[schemaName];

      // Handle the items in the second object above
      this.handleAdapterData(split);

      // push the result (array of ID's) and metadata into list store
      this.store.dispatch({type: 'SET_LIST_COUNT', meta: {uri: adapterConfig.uri}, payload: count});
      this.store.dispatch({type: 'SET_LIST_PAGE', meta: {uri: adapterConfig.uri}, payload: page});
      this.store.dispatch({type: 'SET_LIST_RESULT', meta: {uri: adapterConfig.uri}, payload: listArray});

      return data;
    } 
  }

  generateSlug (entity: any) {
    return ApiV2Adapter.generateSlug(entity);
  }

}