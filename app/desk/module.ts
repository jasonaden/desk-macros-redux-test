import {Store, createStore} from 'redux';
import ngRedux from 'ng-redux';

import {setMacros} from '../desk-agent-case-macros/states';
import {setCases} from '../desk-agent-case/states';
import '../desk-agent/module';
import * as comp from './components';
import {routes} from './config/routes';

import {rootReducer} from './states';

// pre-load from fixture data
import {macroList} from '../data/macros';
import {caseList} from '../data/cases';

// export const DeskStore:Store = createStore(rootReducer);
export const deskMod = angular.module('desk', ['ngRedux', 'ui.router', 'desk.agent']);

deskMod.config($ngReduxProvider => {
  $ngReduxProvider.createStoreWith(rootReducer)
})
.run(($ngRedux) => {
  $ngRedux.dispatch(setMacros(macroList));
  $ngRedux.dispatch(setCases(caseList));
});

deskMod
  .config(routes)
  .component('filterList', comp.FilterListComponent)
  .component('filterListSelector', comp.FilterListSelectorComponent)
  .component('filterListFilter', comp.FilterListFilterComponent)
  .component('desk', comp.DeskComponent);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['desk']);
});
