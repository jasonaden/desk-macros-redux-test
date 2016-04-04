
import * as ng from 'angular';

import {joinUrl, parseJson} from './utils';

import {IResourceAdapter, IResourceAdapterConfig, IResourceRequestConfig, IInterceptorConfig} from './resource-adapter';

/*
* Base Adapter for an API
*/
export class ApiV2Adapter implements IResourceAdapter {

  // Base URL for the API
  static baseUrl: string = '/api/v2';
  // Do or don't remove trailing slash 
  static removeTrailingSlash: Boolean = true;
  // Date pattern to be used to find dates in returns from the API
  static datePattern: RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
  
  static generateSlug = function (entity) {
    return entity.id;
  }
  
  constructor (private $http: ng.IHttpService, private $q: ng.IQService) {
    if (!this.interceptors) {
      this.interceptors = [];  
    }
  }

  // Execute request based on given DsResourceAdapterConfig
  execute (config: IResourceRequestConfig): ng.IPromise<any> {
    return this.doRequest(config);
  }
    
  // Default reviver (override this)
  reviver (key, value) {
    if (value && value._id)
      value['@resource'] = value._type || true
    else if (typeof value !== 'string' && value && value.length)
      value['@collection'] = {}
    return value;
  }
  
  doRequest (config: IResourceRequestConfig): ng.IPromise<any> {
    config.url = joinUrl(config.url, config.baseUrl || ApiV2Adapter.baseUrl);
    // Add default transforms
    for (let method of ['transformRequest', 'transformResponse'])
      if (config[method]) {
        config[method] = [].concat(this[method].bind(this), config[method]);
      } else {
        config[method] = this[method].bind(this);
      }
    // Set up default interceptors
    let interceptors = this.interceptors.concat(config.interceptor);
    config.interceptor = {
      response: (response): ng.IPromise<any> => {
        let promise = this.$q.when(response)
        let icptr;
        for (icptr in interceptors) {
          let fn;
          if (fn = icptr && icptr.response) {
            promise = promise.then(fn)
          }
        }
        return promise;
      },
      responseError: (response) => {
        let promise = this.$q.reject(response)
        let icptr;
        for (icptr of interceptors) {
          let fn;
          if (fn = icptr && icptr.responseError) {
            promise = promise.catch(fn)
          }
        }
        return promise;
      }
    };
    // Config could be deferred by a request interceptor
    let request = this.$q.when(config);
    let icptr;
    for (icptr of interceptors) {
      let fn;
      if (fn = icptr && icptr.request) {
        request = request.then(fn)
      }
    } 
    return request.then((config) => {
      return this.$http(config)
        .then(x => {
          return x;
        })
        .then(config.interceptor.response, config.interceptor.responseError)
    })
  }
  

  // Default response transform
  transformResponse (data, headers) {
    return parseJson(ApiV2Adapter.datePattern, this.reviver, data, headers);
  }

  // Default request transform
  transformRequest (data, headers) {
    return JSON.stringify(data, (key, value) => {
      if (['@viewModel','@descriptor'].indexOf(key) == -1) {
        return value;
      }
    });
  }


  // Default interceptors
  interceptors: IInterceptorConfig[];


}