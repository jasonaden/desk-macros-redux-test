import * as comp from './components';
import {routes} from './config/routes';
import {CaseList} from './resources/caseList';

export const caseListMod = angular.module('desk.agent.case.list', []);

caseListMod
  .config(routes)
  .component('caseList', comp.CaseListComponent)
  .service('CaseListResource', CaseList);

