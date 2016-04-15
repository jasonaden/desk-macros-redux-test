
import {Resource} from './resource';
import * as configureMockStore from 'redux-mock-store';
import * as thunk from 'redux-thunk';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

let $httpBackend: ng.IHttpBackendService;
let $rootScope: ng.IRootScopeService;
let Case;
let response = [{}];
let store = mockStore({});
let url: string = 'http://localhost:8888/cases';

describe('Resource', () => {
  
  beforeEach(angular.mock.module('app'));
  
  beforeEach(inject(function(_$httpBackend_, _$rootScope_, _Case_) {
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    Case = _Case_;    
    
    $httpBackend.expectGET(url).respond(200, response);  
    
    // Mock the store
    Case.store = store;
    Case.store.clearActions();
  }));
  
  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();    
  });    
  
  it ('should have isLoading method default to false', () => {
    $httpBackend.flush();
    expect(Resource.isLoading()).toBe(false);   
  });  
  
  it ('should have isLoading(id) method default to false', () => {
    $httpBackend.flush();
    expect(Resource.isLoading(1)).toBe(false);
  });
  
  it ('dispatches the proper actions when loading cases (success)', () => {  
    let actions = [
      { type: 'LOADING_MANY_CASE', payload: undefined},
      { type: 'LOAD_MANY_CASE', payload: response}  
    ];    
    $httpBackend.whenGET(url).respond(200, response);
    Case.loadMany();
    $httpBackend.flush();
    expect(Case.store.getActions()).toEqual(actions);
  });
  
  it ('dispatches the proper actions when loading cases (error)', () => {        
    let actions;
    $httpBackend.whenGET(url).respond(500, response);    
    Case.loadMany().catch((error) => {      
      actions = [
        { type: 'LOADING_MANY_CASE', payload: undefined},
        { type: 'ERROR_CASE', payload: error}  
      ];      
    });
    $httpBackend.flush();
    expect(Case.store.getActions()).toEqual(actions);
  });
});
