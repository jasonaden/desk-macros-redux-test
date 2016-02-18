import {Component, ViewChild, Input, Output, EventEmitter} from 'angular2/core';
import {NgForm} from 'angular2/common';

@Component({
	selector: 'MacroFilter',
	template: `
  <form>
    <input class="form-control" [placeholder]="placeholder || 'Filter'" ngControl="filter">
  </form>
	`
})
export class MacroFilter {
  @ViewChild(NgForm) form;
  @Input() placeholder;
  @Output() filterChange = new EventEmitter();
  
  constructor () { }
  ngAfterViewInit () {
    this.form.control.valueChanges
    .map(c => c.filter)
    .forEach(txt => this.filterChange.emit(txt))
  }
};