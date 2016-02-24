import '../desk-agent/module';
import * as comp from './components';

import {DeskStore} from './states/store';

export const desk = angular.module('desk', ['desk.agent']);

desk
  .component('filterList', comp.FilterListComponent)
  .component('filterListSelector', comp.FilterListSelectorComponent)
  .component('filterListFilter', comp.FilterListFilterComponent)
  .component('desk', comp.DeskComponent)
  .value('DeskStore', DeskStore);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['desk']);
});