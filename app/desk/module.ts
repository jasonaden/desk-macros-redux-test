import '../desk-agent/module';
import {DeskComponent, FilterListSelectorComponent} from './components';
import {DeskStore} from './states/store';

export const desk = angular.module('desk', ['desk.agent']);

desk
  .component('filterListSelector', FilterListSelectorComponent)
  .component('desk', DeskComponent)
  .value('DeskStore', DeskStore);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['desk']);
});