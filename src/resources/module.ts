import {Case} from './case';
import {Resource} from './resource';
import {ResourceAdapter} from './interfaces';
import {ApiV2Adapter} from './apiv2-adapter';
export const resourceModule = angular.module('ds.resources', []);

resourceModule
  .service("Case", Case)
  // .service("ResourceAdapter", ResourceAdapter)
  .service("ApiV2Adapter", ApiV2Adapter);
