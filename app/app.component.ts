
import {macroList} from './data/macros';
import {caseList} from './data/cases';
import {setMacros} from './macros/states/actions';
import {setCases} from './cases/states/actions';

import {macros} from './macros/states/selectors';
import {cases} from './cases/states/selectors';

export class DeskApp {
  macros;
  cases;
  
  constructor (AppStore) {
    let store = AppStore;
    
    store.subscribe(() => {
      let state = store.getState();
      this.macros = macros(state);
      this.cases = cases(state);
    });

    store.dispatch(setMacros(macroList));
    store.dispatch(setCases(caseList));
  };
  
}

export const DeskAppComponent = {
  template: `
    <div class="row">
      <div class="col-md-3">
        <case-selector cases="$ctrl.cases"></case-selector>
      </div>
      <div class="col-md-3">
        <macro-selector macros="$ctrl.macros"></macro-selector>
      </div>
      <div class="col-md-3">
        <macro-folder-selector macros="$ctrl.macros"></macro-folder-selector>
      </div>
    </div>
	`,
  controller: DeskApp
};
