import {Component, ViewChild, EventEmitter} from 'angular2/core';
import {rootReducer} from './states/macros/reducers';
import {macroList} from './data/macros';

import {AppStore} from './states/app';

import {MacroFilter} from './components/macros/macroFilter';
import {MacroList} from './components/macros/macroList';
import {MacroFolderList} from './components/macros/folderList';

import {setMacros, setMacroFilter, addMacroFilter} from './states/macros/actions';
import {macros, macroFilters, filteredMacros, filteredFolders} from './states/macros/selectors';

@Component({
	selector: 'DeskMacros',
  directives: [MacroFilter, MacroList, MacroFolderList],
  providers: [AppStore],
  template: `
  <button (click)="addMacroFilter()">+ Add Macro Filter</button>
  <!-- <MacroFilter *ngFor="#filter of ; #idx = index" (filterChange)="onFilterChange($event)"></MacroFilter> -->
  <div style="float: left;">
    <h1>State</h1>
    <MacroList [macros]="macros"></MacroList>
  </div>
  <MacroSelector style="float: left;" *ngFor="#selector of macroFilters; #idx = index">
    <h1>Macros  {{idx}}</h1>
    <MacroFilter (filterChange)="onFilterChange($event)"></MacroFilter>
    <MacroList [macros]="filteredMacros"></MacroList>
  </MacroSelector>
  <div style="float: left;">
    <h1>Folders</h1>
    <MacroFolderList [folders]="filteredFolders"></MacroFolderList>
  </div>
	`
})
export class DeskMacrosComponent {
  state: Object;
  macros: Object[];
  filteredMacros: Object[];
  filteredFolders: Object[];
  macroFilters: string[];
  
  constructor (private _store: AppStore) {
    _store.subscribe(() => {
      let state = _store.getState()
      this.macros = macros(state);
      // this.filteredMacros = filteredMacros(state);
      // this.filteredFolders = filteredFolders(state);
      this.macroFilters = macroFilters(state);
      console.log(this.filteredFolders)
    });
    
    _store.dispatch(setMacros(macroList));
    
	}
  
  onFilterChange (filter: string) {
    console.log(filter);
    this._store.dispatch(setMacroFilter(filter))
  }
  
  addMacroFilter () {
    this._store.dispatch(addMacroFilter())
  }
};
