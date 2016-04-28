// Load vendor files
import "./vendor/index";

// Application CSS
import "./styles/index.scss";

// Import application modules
import './modules/desk/module';

import ngReduxUiRouter from 'redux-ui-router';

// export const DeskStore:Store = createStore(rootReducer);
export const deskMod = angular.module('app', [
  'ngRedux', 
  'ui.router',
  ngReduxUiRouter,
  'desk'
]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['app']);
});
