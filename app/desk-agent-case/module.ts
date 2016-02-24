import '../desk-agent-case-macros/module';
import * as comp from './components';

export const caseMod = angular.module('desk.agent.case', ['desk.agent.case.macros']);

caseMod
  .component('caseFilterList', comp.CaseFilterList)
  .component('caseList', comp.CaseListComponent);
