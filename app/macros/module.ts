export const macroMod = angular.module('macro', []);

import {MacroSelectorComponent, MacroFolderSelectorComponent, MacroFilterComponent} from './components';

macroMod
  .component('macroSelector', MacroSelectorComponent)
  .component('macroFolderSelector', MacroSelectorComponent)
  .component('macroFilter', MacroFilterComponent);
