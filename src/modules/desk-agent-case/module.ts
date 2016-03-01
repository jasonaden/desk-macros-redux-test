import * as comp from './components';

export const caseMod = angular.module('desk.agent.case', []);

caseMod
  .component('case', comp.CaseComponent);
