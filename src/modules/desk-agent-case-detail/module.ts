import * as comp from './components';
import {CaseDetailService} from './services/CaseDetailService';
import {routes} from './config/routes';

export const caseDetailMod = angular.module('desk.agent.case.detail', []);

caseDetailMod
  .config(routes)
  .component('caseDetail', comp.CaseDetailComponent)
  .service('CaseDetailService', CaseDetailService);
