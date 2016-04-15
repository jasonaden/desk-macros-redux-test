
import {Resource} from './resource';
import * as configureMockStore from 'redux-mock-store';
import * as thunk from 'redux-thunk';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

let $httpBackend: ng.IHttpBackendService;
let $rootScope: ng.IRootScopeService;
let Case;
let response = {_links: {self: {href: '/test/1'}}, _embedded: {entries: [{}]}};
let store = mockStore({});;

describe('Resource', () => {
  
  beforeEach(angular.mock.module('app'));
  
  beforeEach(inject(function(_$httpBackend_, _$rootScope_, _Case_) {
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    Case = _Case_;      
   
    // Mock the store
    Case.store = store;
    
    $httpBackend.whenGET('http://localhost:8888/cases').respond(200, response);
  }));
  
  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();    
  });    
  
  it ('should have isLoading method default to false', () => {
    $httpBackend.flush();
    expect(Case.isLoading()).toBe(false);   
  });  
  
  it ('should have isLoading(id) method default to false', () => {
    $httpBackend.flush();
    expect(Case.isLoading(1)).toBe(false);
  });
  
  it ('dispatches the proper actions when loading cases (success)', () => {  
    const actions = [
      { type: 'LOADING_MANY_CASE', payload: undefined},
      { type: 'LOAD_MANY_CASE', payload: {result: [ ], items: {}, meta: {count: undefined, page: undefined, links: {self: {href: '/test/1'}}}}}  
    ];    
    Case.loadMany();
    $httpBackend.flush();
    expect(Case.store.getActions()).toEqual(actions);
  });
});

// [ Object({ type: 'LOADING_MANY_CASE', payload: undefined }), Object({ type: 'LOAD_MANY_CASE', payload: Object({ result: [  ], items: Object({ undefined: Object({  }) }), meta: Object({ count: undefined, page: undefined, links: Object({ self: Object({ href: '/test/1' }) }) }) }) }) ]
// [ Object({ type: 'LOADING_MANY_CASE', payload: undefined }), Object({ type: 'LOAD_MANY_CASE', payload: Object({ result: [  ], items: Object({  }), meta: Object({ count: undefined, page: undefined, links: Object({  }) }) }) }) ]