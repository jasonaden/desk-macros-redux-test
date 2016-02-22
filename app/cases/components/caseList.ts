
export class CaseList {
  constructor () {}
};

export const CaseListComponent = {
  controller: CaseList,
  bindings: {
    cases: '<'
  },
	template: `
    <ul>
      <li *ngFor="#kase of cases">
        {{kase.subject}}
      </li>
    </ul>
	`
}
