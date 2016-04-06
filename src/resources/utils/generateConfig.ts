import {IResourceAdapter, IResourceRequestConfig} from '../interfaces';
import {joinUrl} from './joinUrl';

export function generateConfig ($q: ng.IQService, adapter: IResourceAdapter, config: IResourceRequestConfig): ng.IPromise<any> {
  config.url = joinUrl(config.url, config.baseUrl || adapter.baseUrl);
  
  // Add default transforms
  for (let method of ['transformRequest', 'transformResponse'])
    if (config[method]) {
      config[method] = [].concat(adapter[method].bind(adapter), config[method]);
    } else {
      config[method] = adapter[method].bind(adapter);
    }
  // Set up default interceptors
  let interceptors = adapter.interceptors.concat(config.interceptors);
  config.interceptors = {
    response: (response): ng.IPromise<any> => {
      let promise = $q.when(response)
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
      let promise = $q.reject(response)
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
  let request = $q.when(config);
  let icptr;
  for (icptr of interceptors) {
    let fn;
    if (fn = icptr && icptr.request) {
      request = request.then(fn)
    }
  }
  return request;
}