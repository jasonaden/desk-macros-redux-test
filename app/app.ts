import './cases/index.js';
import './macros/index.js';

import {DeskAppComponent} from './app.component';
import {AppStore} from './store';

export const app = angular.module('app', ['case', 'macro']);

app
  .component('deskApp', DeskAppComponent)
  .value('AppStore', AppStore);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['app']);
});

