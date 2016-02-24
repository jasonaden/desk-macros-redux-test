import '../desk-agent-case-macros/module';
import * as comp from './components';

export const caseDetailMod = angular.module('desk.agent.case.detail', ['desk.agent.case.macros']);

caseDetailMod
  .component('caseDetail', comp.CaseDetailComponent);
