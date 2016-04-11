
import * as ng from 'angular';

import {IResourceAdapter} from './interfaces';
import {ResourceAdapter} from './adapter';

/*
* Base Adapter for an API
*/
export class ApiV2Adapter extends ResourceAdapter implements IResourceAdapter {

  // Base URL for the API
  baseUrl: string = 'http://localhost:8888';
  
  static generateSlug = function (entity) {
    return entity.id;
  }
  
  constructor ($http: ng.IHttpService, $q: ng.IQService) {
    super($http, $q);
  }


}