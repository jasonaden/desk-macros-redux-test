import * as comp from './components';
import {routes} from './config/routes';

export const caseListMod = angular.module('desk.agent.case.list', []);

caseListMod
  .config(routes)
  .component('caseList', comp.CaseListComponent);

