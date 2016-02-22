import {Component, Input} from 'angular2/core';

@Component({
	selector: 'CaseList',
	template: `
    <ul>
      <li *ngFor="#kase of cases">
        {{kase.subject}}
      </li>
    </ul>
	`
})
export class CaseList {
  @Input() cases: Object[];
};