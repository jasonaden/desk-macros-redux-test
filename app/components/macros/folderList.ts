import {Component, Input} from 'angular2/core';

@Component({
	selector: 'MacroFolderList',
	template: `
    <ul>
      <li *ngFor="#folder of folders">
        {{folder.name}}
      </li>
    </ul>
	`
})
export class MacroFolderList {
  @Input() folders: Object[];
};