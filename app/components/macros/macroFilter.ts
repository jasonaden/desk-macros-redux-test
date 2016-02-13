import {Component, ViewChild, Output, EventEmitter} from 'angular2/core';
import {NgForm} from 'angular2/common';

@Component({
	selector: 'MacroFilter',
	template: `
  <form>
    <input ngControl="filter">
  </form>
	`
})
export class MacroFilter {
  @ViewChild(NgForm) form;
  @Output() filterChange = new EventEmitter();
  
  constructor () { }
  ngAfterViewInit () {
    this.form.control.valueChanges
    .map(c => c.filter)
    .forEach(txt => this.filterChange.emit(txt))
  }
};