import '../desk-agent/module';
import * as comp from './components';
import {routes} from './config/routes';

import {DeskStore} from './states/store';

export const deskMod = angular.module('desk', ['ui.router', 'desk.agent']);

deskMod
  .config(routes)
  .component('filterList', comp.FilterListComponent)
  .component('filterListSelector', comp.FilterListSelectorComponent)
  .component('filterListFilter', comp.FilterListFilterComponent)
  .component('desk', comp.DeskComponent)
  .value('DeskStore', DeskStore);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['desk']);
});