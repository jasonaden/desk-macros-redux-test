import {ResourceAdapter} from '../resource-adapter';
import {generateConfig} from '../utils';
import {IResourceAdapter, IResourceRequestConfig} from '../interfaces';

var $http: ng.IHttpService;
var $q: ng.IQService;
var adapter: IResourceAdapter;
var config: IResourceRequestConfig;
var $rootScope: ng.IRootScopeService;

describe('generateConfig', () => {  
  beforeEach(inject(function(_$http_, _$httpBackend_, _$q_, _$rootScope_) {
    $q = _$q_;
    $rootScope = _$rootScope_;
    adapter = new ResourceAdapter($http, $q);
    config = {
      method: 'GET',
      url: '/foo/bar'      
    };  
  }));
    
  it ('is defined', () => {
     expect(generateConfig).toBeDefined();
  });
  
  it ('returns a promise', () => {
    let request = generateConfig($q, adapter, config);
    expect(request.then).toBeDefined(); 
  });  
  
  it ('adds default transforms', () => {
    generateConfig($q, adapter, config).then((config) => {
      expect(config.transformResponse).toBeDefined();
      expect(config.transformRequest).toBeDefined();      
    });
    $rootScope.$digest();
  });  
  
  it ('sets up default interceptors', () => {
    generateConfig($q, adapter, config).then((config) => {
      expect(config.interceptors.response).toBeDefined();
      expect(config.interceptors.responseError).toBeDefined();  
    });
    $rootScope.$digest();
  });    
});