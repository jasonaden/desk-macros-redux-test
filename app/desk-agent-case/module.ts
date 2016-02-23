import '../desk-agent-case-macros/module';
import {CaseSelectorComponent, CaseFilterComponent, CaseListComponent} from './components';

export const caseMod = angular.module('desk.agent.case', ['desk.agent.case.macros']);

caseMod
  .component('caseSelector', CaseSelectorComponent)
  .component('caseList', CaseListComponent)
  .component('caseFilter', CaseFilterComponent);
