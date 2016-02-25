import '../desk-agent-case-list/module';
import '../desk-agent-case-detail/module';
import '../desk-agent-case/module';
import {routes} from './config/routes';

export const deskAgentMod = angular.module('desk.agent', ['desk.agent.case', 'desk.agent.case.list', 'desk.agent.case.detail']);
import * as comp from './components';

deskAgentMod
  .config(routes)
  .component('deskAgent', comp.DeskAgentComponent);