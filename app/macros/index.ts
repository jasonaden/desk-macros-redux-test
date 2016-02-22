export const macroMod = angular.module('macro', []);

import {MacroSelector, MacroFolderSelector, MacroFilter} from './components/';

macroMod
  .component('MacroSelector', MacroSelector)
  .component('MacroFolderSelector', MacroSelector)
  .component('MacroFilter', MacroFilter);
