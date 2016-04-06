import * as comp from './components';

export const macroMod = angular.module('desk.agent.case.macros', []);

macroMod
  .component('macroList', comp.MacroListComponent);
  