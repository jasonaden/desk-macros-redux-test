export const macroMod = angular.module('macro', []);
import * as comp from './components';

macroMod
  .component('macroSelector', comp.MacroSelectorComponent)
  .component('macroFolderSelector', comp.MacroFolderSelectorComponent)
  .component('macroFilter', comp.MacroFilterComponent)
  .component('macroApply', comp.MacroApplyComponent);
