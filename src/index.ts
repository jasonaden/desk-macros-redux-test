import ngReduxUiRouter from 'redux-ui-router';

// active custom devtools formatters for chrome
import * as Immutable from 'immutable';

import * as immutableDevTools from 'immutable-devtools';
immutableDevTools(Immutable);

// Load vendor files
import "./vendor/index";

// Application CSS
import "./styles/index.scss";

// Import application modules
import './modules/desk/module';



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
