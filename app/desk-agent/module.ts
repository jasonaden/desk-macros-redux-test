import '../desk-agent-case/module';

export const deskAgent = angular.module('desk.agent', ['desk.agent.case']);
import * as comp from './components';

deskAgent
  .component('deskAgent', comp.DeskAgentComponent);