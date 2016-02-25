import '../desk-agent-case-list/module';
import '../desk-agent-case-detail/module';
import * as comp from './components';

export const caseMod = angular.module('desk.agent.case', ['desk.agent.case.list', 'desk.agent.case.detail']);

caseMod
  .component('case', comp.CaseComponent);
