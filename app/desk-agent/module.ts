import '../desk-agent-case/module';
import '../desk-agent-case-macros/module';

export const deskAgent = angular.module('desk.agent', ['case', 'macro']);
import * as comp from './components';
console.log('here');
deskAgent
  .component('deskAgent', comp.DeskAgentComponent);