export class MacroList {
  constructor () {}
}

export const MacroListComponent = {
  controller: MacroList,
  bindings: {
    macros: '<'
  },
	template: `
    <ul>
      <li *ngFor="#macro of macros">
        {{macro.name}}
      </li>
    </ul>
	`
}