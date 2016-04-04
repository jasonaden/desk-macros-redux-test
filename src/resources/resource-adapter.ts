
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
