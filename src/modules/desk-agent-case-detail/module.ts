import * as comp from './components';
import {routes} from './config/routes';

export const caseDetailMod = angular.module('desk.agent.case.detail', []);

caseDetailMod
  .config(routes)
  .component('caseDetail', comp.CaseDetailComponent);
