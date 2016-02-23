
export class MacroFolderList {
  constructor () {}
};

export const MacroFolderListComponent = {
	selector: 'MacroFolderList',
  controller: MacroFolderList,
  bindings: {
    folders: '<'
  },
	template: `
    <ul>
      <li *ngFor="#folder of folders">
        {{folder.name}}
      </li>
    </ul>
	`
}
