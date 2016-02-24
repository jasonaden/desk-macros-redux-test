import * as comp from './components';

export const caseListMod = angular.module('desk.agent.case.list', []);

caseListMod
  .component('caseList', comp.CaseListComponent);
