import {ResourceAdapter} from './resource-adapter';
import 'angular-mocks';
import {IResourceAdapter, IResourceRequestConfig} from './interfaces';

var $httpBackend: ng.IHttpBackendService;
var $q: ng.IQService;
var $http: ng.IHttpService;
var adapter: IResourceAdapter;
var url: string;
var config: IResourceRequestConfig;

describe('ResourceAdapter', () => {
  beforeEach(inject(function(_$http_, _$httpBackend_, _$q_) {
    $http = _$http_;
    $httpBackend = _$httpBackend_;
    $q = _$q_;
    adapter = new ResourceAdapter($http, $q);
    url = '/foo/bar';     
    config = {
      method: 'GET',
      url: url            
    };  
  }));
    
  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();    
  });    

  it ('makes a request', () => {           
    $httpBackend.expectGET(config.url).respond(200);    
    adapter.execute(config);  
    $httpBackend.flush(); 
  });
    
  it ('transforms a response', () => {
    config = Object.assign({}, config, {            
      transformResponse: (response) => {
        response.name = 'Mr. ' + response.name;
        return response;
      }
    });           
    $httpBackend.whenGET(config.url).respond(200, { name: 'Smith'});    
    adapter.execute(config).then((response) => {
      expect(response.data.name).toBe('Mr. Smith');
    });     
    $httpBackend.flush(); 
  });   
    
  it ('transforms a request', () => {
    config = Object.assign({}, config, {
      method: 'POST',
      data: { name: 'Smith' },
      transformRequest: (request) => {
        let data = JSON.parse(request);
        data.name = 'Mr. ' + data.name;
        return data;
      }
    }); 
    $httpBackend.expectPOST(config.url, { name: 'Mr. Smith'}).respond(200);
    adapter.execute(config);  
    $httpBackend.flush();
  });      
    
  it ('allows custom interceptors for a response', () => {
    let response = null;
    config = Object.assign({}, config, {
      method: 'GET',
      interceptors: {
        response: (config) => {
          config.data.name = 'Mr. ' + config.data.name;
          return config;
        }
      }
    }); 
    $httpBackend.whenGET(config.url).respond(200, { name: 'Smith' });
    adapter.execute(config).then((res) => {
      response = res.data;
    });
    $httpBackend.flush();
    expect(response).toEqual({ name: 'Mr. Smith' }); 
  });  
        
  it ('allows custom interceptors for a response error', () => {
    let error = null;
    let errorResponse = 'Error!'
    config = Object.assign({}, config, {
      method: 'GET',
      interceptors: {
        responseError: (rejection) => {
          rejection.data = errorResponse;
          return $q.reject(rejection);
        }
      }
    }); 
    $httpBackend.whenGET(config.url).respond(500);
    adapter.execute(config).catch((err) => {
      error = err.data;
    });
    $httpBackend.flush();
    expect(error).toEqual(errorResponse); 
  });  
});