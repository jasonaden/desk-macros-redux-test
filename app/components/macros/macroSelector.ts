import {Component, Input} from 'angular2/core';
import {MacroFilter} from './macroFilter';
import {setMacroFilter} from '../../states/macroFilter/actions';
import {filteredMacros} from '../../states/macroFilter/selectors';
import {AppStore} from '../../states/store';

@Component({
	selector: 'MacroSelector',
  directives: [MacroFilter],
	template: `
    <div class="panel panel-default">
      <div class="panel-heading">
        <MacroFilter placeholder="Filter Macros" (filterChange)="onFilterChange($event)"></MacroFilter>
      </div>
      <div class="panel-body">
        <ul>
          <li *ngFor="#macro of filterMacros()">{{macro.name}}</li>
        </ul>
      </div>
	`
})
export class MacroSelector {
  filteredMacros: Object[];
  @Input() macros: Object[];
  
  constructor(public store: AppStore) {
    // this.filterMacros();
  }
  
  filterMacros() {
    return filteredMacros(this.store.getState());
  }
  
  onFilterChange (filter: string) {
    this.store.dispatch(setMacroFilter(filter))
    // this.filterMacros();
  }
  
};