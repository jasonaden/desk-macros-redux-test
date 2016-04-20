
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
let url: string = 'http://localhost:8888/api/v2/cases';

describe('Resource', () => {
  
  beforeEach(angular.mock.module('app'));
  
  beforeEach(inject(function(_$httpBackend_, _$rootScope_, _Case_) {
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    Case = _Case_;    
    
    // Mock the store
    Case.store = store;
    Case.store.clearActions();
    
    $httpBackend.expectGET(url).respond(200, response);
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
      
  it ('dispatches the proper actions when finding (success)', () => {  
    let actions = [
      { type: 'FINDING_CASE', payload: undefined},
      { type: 'FIND_CASE', payload: {result: [ ], items: {}, meta: {count: undefined, page: undefined, links: {self: {href: '/test/1'}}}}}  
    ];    
    $httpBackend.whenGET(url).respond(200, response);
    Case.find();
    $httpBackend.flush();
    expect(Case.store.getActions()).toEqual(actions);
  });

  it ('dispatches the proper actions when finding (error)', () => {        
    let actions;
    $httpBackend.whenGET(url).respond(500, response);    
    Case.find().catch((error) => {      
      actions = [
        { type: 'FINDING_CASE', payload: undefined},
        { type: 'ERROR_CASE', payload: error}  
      ];      
    });
    $httpBackend.flush();
    expect(Case.store.getActions()).toEqual(actions);
  });
       
});
