import './desk-agent/module';
import {AppComponent} from './app.component';
import {AppStore} from './store';

export const app = angular.module('app', ['desk.agent']);

app
  .component('app', AppComponent)
  .value('AppStore', AppStore);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['app']);
});

