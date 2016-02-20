
import {Store} from '@ngrx/store';
import {macroList} from './data/macros';
import {setMacros} from './states/macroFilter/actions';

import {macros} from './states/macroFilter/selectors';

export class DeskMacros {
  macros;
  
  constructor (AppStore) {
    let store = AppStore;
    
    store.subscribe(() => {
      let state = store.getState();
      this.macros = macros(state);
    });
    store.dispatch(setMacros(macroList));
  };
  
}

export const DeskMacrosComponent = {
  template: `
    <div class="row">
      <div class="col-md-3">
        <macro-selector macros="$ctrl.macros"></macro-selector>
      </div>
      <div class="col-md-3">
        <macro-folder-selector macros="$ctrl.macros"></macro-folder-selector>
      </div>
    </div>
	`,
  controller: DeskMacros
};
