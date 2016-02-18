import {Component, Input} from 'angular2/core';
import {MacroFilter} from './macroFilter';
import {setMacroFilter} from '../../states/macroFilter/actions';
import {filteredFolders} from '../../states/macroFilter/selectors';
import {AppStore} from '../../states/store';

@Component({
	selector: 'MacroFolderSelector',
  directives: [MacroFilter],
	template: `
    <div class="panel panel-default">
      <div class="panel-heading">
        <MacroFilter placeholder="Filter Folders" (filterChange)="onFilterChange($event)"></MacroFilter>
      </div>
      <div class="panel-body">
        <ul>
          <li *ngFor="#folder of folders">{{folder.name}}</li>
        </ul>
      </div>
	`
})
export class MacroFolderSelector {
  folders: Object[];
  @Input() macros: Object[];
  
  constructor(public store: AppStore) {
    this.filterFolders();
  }
  
  filterFolders() {
    this.folders = filteredFolders(this.store.getState());
  }
  
  onFilterChange (filter: string) {
    this.store.dispatch(setMacroFilter(filter))
    this.filterFolders();
  }
  
};