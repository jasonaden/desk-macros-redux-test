import {Component, Input} from 'angular2/core';

@Component({
	selector: 'MacroList',
	template: `
    <ul>
      <li *ngFor="#macro of macros">
        {{macro.name}}
      </li>
    </ul>
	`
})
export class MacroList {
  @Input() macros: Object[];
};