
import * as ng from 'angular';

import {transform, joinUrl} from './utils';

export interface IResourceAdapterConfig {
  baseUrl: string,
  removeTrailingSlash: boolean,
  datePattern: RegExp
}

export interface IResourceAdapter {
  execute: (config: IResourceRequestConfig) => ng.IPromise<any>;
  reviver: (key: string, value: any) => any;
  doRequest: (config) => ng.IPromise<any>;
  transformResponse: (data: any, headers: any) => any;
  transformRequest: (data: any, headers: any) => any;
  interceptors: IInterceptorConfig[];
}

export interface IResourceRequestConfig {
  baseUrl?: string;
  removeTrailingSlash?: boolean;
  datePattern?: RegExp;
  url: string;
  method: string;
  transformRequest?: ng.IHttpRequestTransformer | ng.IHttpRequestTransformer[];
  transformResponse?: ng.IHttpRequestTransformer | ng.IHttpRequestTransformer[];
  interceptor?: IInterceptorConfig;
}

export interface IInterceptorConfig {
  response?: (response) => ng.IPromise<any>,
  responseError?: (response) => ng.IPromise<any>
}

/*
* Base Adapter for an API
*/
export class ResourceAdapter implements IResourceAdapter {

  // Base URL for the API
  static baseUrl: string = undefined;
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
    config.url = joinUrl(config.url, config.baseUrl || ResourceAdapter.baseUrl);
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
    var adapter = this;
    var datePattern = ResourceAdapter.datePattern;
    var reviver = function (key, value) {
      if (typeof value == 'string' && value.match(datePattern)) {
        return new Date(value);
      } else {
        return adapter.reviver.call(this, key, value)
      }
    }
      
    var data;
    if (typeof data === 'string') {
      data = JSON.parse(data, reviver); 
    } else if (data != null) {
      transform(data, reviver)
    }
    
    // TODO: Determine if we really want to do this or if it should always return data
    if (!(ng.equals({}, data) || ng.equals([], data))) {
      return data
    }
    
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