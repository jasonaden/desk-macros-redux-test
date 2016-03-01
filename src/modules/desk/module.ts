import ngRedux from 'ng-redux';

import {setMacros} from '../desk-agent-case-macros/states';
import {setCases} from '../desk-agent-case/states';
import '../desk-agent/module';
import '../desk-agent-case/module';
import '../desk-agent-case-detail/module';
import '../desk-agent-case-list/module';
import '../desk-agent-case-macros/module';
import * as comp from './components';
import {routes} from './config/routes';

import {rootReducer} from './states';

// pre-load from fixture data
import {macroList} from '../../data/macros';
import {caseList} from '../../data/cases';

// export const DeskStore:Store = createStore(rootReducer);
export const deskMod = angular.module('desk', [
  'desk.agent', 
  'desk.agent.case', 
  'desk.agent.case.list', 
  'desk.agent.case.macros', 
  'desk.agent.case.detail'
]);

function* foo(){
  var index = 0;
  while (index <= 2) {
    yield index++;
  }
}

var iterator = foo();
console.log(iterator.next()); // { value: 0, done: false }
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

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

