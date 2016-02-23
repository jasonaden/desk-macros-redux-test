import '../desk-agent-case-macros/module';
import {CaseListComponent} from './components';

export const caseMod = angular.module('desk.agent.case', ['desk.agent.case.macros']);

caseMod
  .component('caseList', CaseListComponent);
