export class CaseController {};

export const CaseComponent = {
  controller: CaseController,
	template: `
    <div class="row">
      <div class="col-md-3">
        <case-list></case-list>
      </div>
      <div class="col-md-3">
        <case-detail></case-detail>
      </div>
    </div>
	`
}
