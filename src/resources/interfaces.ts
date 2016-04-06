

export interface IResourceAdapterConfig {
  baseUrl: string,
  removeTrailingSlash?: boolean,
  datePattern?: RegExp
}

export interface IResourceAdapter extends IResourceAdapterConfig {
  execute: (config: IResourceRequestConfig) => ng.IPromise<any>;
  reviver: (key: string, value: any) => any;
  doRequest: (config: IResourceRequestConfig) => ng.IPromise<any>;
  transformResponse: (data: any, headers: any) => any;
  transformRequest: (data: any, headers: any) => any;
  interceptors: ng.IHttpInterceptor | ng.IHttpInterceptor[];
}

/**
 * Extend the base Angular RequestConfig object slightly to include
 * a few additional configurations.
 * 
 * Note that with Angular's $http service, interceptors are only at 
 * the provider level. But with our ResourceRequestConfig object they
 * are also available at the individual request level.
 */
export interface IResourceRequestConfig extends ng.IRequestConfig {
  /**
   * Base URL added to all requests. E.g. `/api/v2`
   */
  baseUrl?: string;
  /**
   * Leave or remove a trailing slash at the end of a URL.
   */
  removeTrailingSlash?: boolean;
  /**
   * Date pattern to be used when parsing JSON return.
   */
  datePattern?: RegExp;
  /**
   * Instance level interceptors. Behaves the same as those documented
   * here on the [Angular Docs](https://docs.angularjs.org/api/ng/service/$http)
   */
  interceptors?: ng.IHttpInterceptor
}

export class ResourceAdapter {
  constructor (config: IResourceAdapter) {
    
  }
}
