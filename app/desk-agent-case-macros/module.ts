
export const macroMod = angular.module('desk.agent.case.macros', []);
import * as comp from './components';

macroMod
  .component('macroFilter', comp.MacroFilterComponent);
