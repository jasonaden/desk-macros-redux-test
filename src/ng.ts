
import * as angular from 'angular';

let injector = angular.injector(['ng']);

export const $q = <ng.IQService>injector.get('$q');
export const $http = <ng.IHttpService>injector.get('$http');
