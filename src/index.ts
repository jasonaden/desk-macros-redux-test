// Load vendor files
import "./vendor/index";

// Application CSS
import "./styles/index.scss";

// Import application modules
import './modules/desk/module';
// import './modules/desk-agent/module';
// import './modules/desk-agent-case/module';
// import './modules/desk-agent-case-detail/module';
// import './modules/desk-agent-case-list/module';
// import './modules/desk-agent-case-macros/module';

// export const DeskStore:Store = createStore(rootReducer);
export const deskMod = angular.module('app', [
  'ngRedux', 
  'ui.router', 
  
  'desk'
]);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['app']);
});
