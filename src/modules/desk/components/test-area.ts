import {Case} from '../resources'

export class TestArea {
  
  case: any;
  
  constructor (public Case: Case) {}
  
  getCase (id) {
    this.Case.findOne(id)
    .then(kase => this.case = kase);
  }
  
}

export const TestAreaComponent = {
  controller: TestArea,
  template: `
    <div>
      <h2>Test Area</h2>
      <section class="panel panel-default">
        <div class="panel-heading">
          <h3>Get a Case</h3>
        </div>
        <div class="form-inline panel-body">
          Enter a case ID to retrieve:
          <input class="form-control" type="number" value="100" ng-model="$ctrl.caseId">
          <button class="btn" type="button" ng-click="$ctrl.getCase($ctrl.caseId)">Get the Case</button>
        </div>
      </section>
    </div>
  `
}