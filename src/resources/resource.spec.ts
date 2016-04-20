import {Resource} from './resource';
import * as configureMockStore from 'redux-mock-store';
import * as thunk from 'redux-thunk';

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

let $httpBackend: ng.IHttpBackendService;
let $rootScope: ng.IRootScopeService;
let Case;
let store = mockStore({});;
let url: string = 'http://localhost:8888/api/v2/cases';
let response = {
   "total_entries": 1,
   "page": 1,
   "_links": {
      "self": {
         "href": "/api/v2/cases?page=1&per_page=50",
         "class": "page"
      }
   },
   "_embedded": {
      "entries": [
         {
            "id": 1,
            "subject": "Test case subject",
            "_links": {
              "self": {
                "href": "/api/v2/cases/1",
                "class": "page"
              }
            },
            "_embedded": {
               "customer": {
                  "id": 10,
                  "name": "John Smith",
                  "_links": {
                    "self": {
                      "href": "/api/v2/customers/10",
                      "class": "page"
                    }
                  }
               },
               "message": {
                  "id": 20,
                  "body": "Message body",
                  "_links": {
                    "self": {
                      "href": "/api/v2/cases/1/message",
                      "class": "page"
                    }
                  }
               }
            }
         }
      ]
   }
}

describe('Resource', () => {

  beforeEach(angular.mock.module('app'));

  beforeEach(inject(function(_$httpBackend_, _$rootScope_, _Case_) {
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    Case = _Case_;

    // Mock the store
    Case.store = store;

    Case.store.clearActions();
  }));

  afterEach(() => {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it ('should have isLoading method default to false', () => {
    expect(Case.isLoading()).toBe(false);
  });

  it ('should have isLoading(id) method default to false', () => {
    expect(Case.isLoading(1)).toBe(false);
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

  it ('dispatches actions for each embedded resource', () => {
    let actions = [
      { type: 'FINDING_CASE', payload: undefined},
      { type: 'FIND_CASE', payload: {
          result: [ '/cases/1' ],
          items: {
            '/cases/1': {
              id: 1,
              subject: 'Test case subject',
              _links: {
                self: {
                  href: '/api/v2/cases/1',
                  class: 'page'
                }
              },
              _embedded: {
                customer: {
                  "id": 10,
                  "name": "John Smith",
                  "_links": {
                    "self": {
                      "href": "/api/v2/customers/10",
                      "class": "page"
                    }
                  }
               },
                message: {
                  "id": 20,
                  "body": "Message body",
                  "_links": {
                    "self": {
                      "href": "/api/v2/cases/1/message",
                      "class": "page"
                    }
                  }
                }
              },
              customer: '/customers/10',
              message: '/cases/1/message' }
          },
          meta: {
            count: 1,
            page: 1,
            links: {
              self: {
                href: '/api/v2/cases?page=1&per_page=50',
                class: 'page'
              }
            }
          }
        }
      },
      { type: 'ADD_CUSTOMER', payload: response._embedded.entries[0]._embedded.customer},
      { type: 'ADD_INTERACTION', payload: response._embedded.entries[0]._embedded.message}
    ];
    $httpBackend.whenGET(url).respond(200, response);
    Case.find();
    $httpBackend.flush();
    expect(Case.store.getActions()).toEqual(actions);
  });

});