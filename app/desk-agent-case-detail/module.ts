import '../desk-agent-case-macros/module';
import * as comp from './components';
import {routes} from './config/routes';

export const caseDetailMod = angular.module('desk.agent.case.detail', ['desk.agent.case.macros']);

caseDetailMod
  .config(routes)
  .component('caseDetail', comp.CaseDetailComponent);
