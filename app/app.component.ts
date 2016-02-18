import {Component} from 'angular2/core';
import {macroList} from './data/macros';

import {AppStore} from './states/store';

import {MacroSelector, MacroFolderSelector} from './components/macros';
import {setMacros, setMacroFilter, addMacroFilter} from './states/macroFilter/actions';

import {macros, macroFilter, filteredMacros, filteredFolders} from './states/macroFilter/selectors';

@Component({
	selector: 'DeskMacros',
  providers: [AppStore],
  directives: [MacroSelector, MacroFolderSelector],
  template: `
    <div class="row">
      <div class="col-md-3">
        <MacroSelector [macros]="macros"></MacroSelector>
      </div>
      <div class="col-md-3">
        <MacroFolderSelector [macros]="macros"></MacroFolderSelector>
      </div>
    </div>
	`
})
export class DeskMacrosComponent {
  macros: Object[];
  constructor (store: AppStore) {
    store.subscribe(() => {
      let state = store.getState();
      this.macros = macros(state);
    });
    
    store.dispatch(setMacros(macroList));
    
	}
};