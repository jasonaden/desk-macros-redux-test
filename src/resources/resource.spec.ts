
import {Resource} from './resource';
import * as configureMockStore from 'redux-mock-store';
import * as thunk from 'redux-thunk';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

let $httpBackend: ng.IHttpBackendService;
let $rootScope: ng.IRootScopeService;
let Case;
let response = [{}];
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
    expect(Resource.isLoading()).toBe(false);   
  });  
  
  it ('should have isLoading(id) method default to false', () => {
    $httpBackend.flush();
    expect(Resource.isLoading(1)).toBe(false);
  });
  
  it ('dispatches the proper actions when loading cases (success)', () => {  
    const actions = [
      { type: 'LOADING_MANY_CASE', payload: undefined},
      { type: 'LOAD_MANY_CASE', payload: response}  
    ];    
    Case.loadMany();
    $httpBackend.flush();
    expect(Case.store.getActions()).toEqual(actions);
  });
});
