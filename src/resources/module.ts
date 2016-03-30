import {Case} from './case';
import {Resource} from './resource';
import {ResourceAdapter} from './resource-adapter';
export const resourceModule = angular.module('ds.resources', []);

resourceModule
  .service("Case", Case)
  .service("ResourceAdapter", ResourceAdapter);
