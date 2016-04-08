import {ResourceAdapter} from './adapter';
import 'angular-mocks';
import 'babel-polyfill';

var $httpBackend: ng.IHttpBackendService;
var $q: ng.IQService;
var $http: ng.IHttpService;

describe("ResourceAdapter", () => {
    beforeEach(inject(function(_$http_, _$httpBackend_, _$q_) {
        $http = _$http_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
    }));
    
    afterEach(() => {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();    
    });    

    it ('makes a GET request', () => {                
        let adapter = new ResourceAdapter($http, $q);        
        let config = {
            url: 'foo/bar',
            method: 'GET'
        };           
        $httpBackend.expectGET('//foo/bar').respond(200);    
        adapter.execute(config);        
        $httpBackend.flush();       
    });
    
    it ('transforms a response', () => {
        let adapter = new ResourceAdapter($http, $q);        
        let config = {
            url: 'foo/bar',
            method: 'GET',
            transformResponse: (response) => {
                response.name = 'Mr. ' + response.name;
                return response;
            }
        };           
        $httpBackend.whenGET('//foo/bar').respond(200, { name: 'Smith'});    
        adapter.execute(config).then(response => {
            expect(response.data.name).toBe('Mr. Smith');
        });
        $httpBackend.flush();  
    });        
});