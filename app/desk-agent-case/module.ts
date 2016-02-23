import '../desk-agent-case-macros/module';
import {CaseFilterComponent, CaseListComponent} from './components';

export const caseMod = angular.module('desk.agent.case', ['desk.agent.case.macros']);

caseMod
  .component('caseList', CaseListComponent)
  .component('caseFilter', CaseFilterComponent);
