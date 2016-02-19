
export const app = angular.module('app', []);

import {DeskMacrosComponent} from './app.component';
import {AppStore} from './states/store';
import {MacroSelectorComponent} from './components/macros/macroSelector';
import {MacroFolderSelectorComponent} from './components/macros/macroFolderSelector';
import {MacroFilterComponent} from './components/macros/macroFilter';


app
  .component('deskMacros', DeskMacrosComponent)
  .component('macroSelector', MacroSelectorComponent)
  .component('macroFolderSelector', MacroFolderSelectorComponent)
  .component('macroFilter', MacroFilterComponent)
  .value('AppStore', AppStore);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['app']);
});

