
export const MacroApplyComponent = {
  template:`
    <div class="row">
      <div class="col-md-3">
        Selected Case: {{($ctrl.selectedCase ? '(#'+$ctrl.selectedCase.id + ') - ' + $ctrl.selectedCase.subject : 'None Selected')}}
      </div>
      <div class="col-md-3">
        Selected Macro: {{($ctrl.selectedMacro ? $ctrl.selectedMacro.name : 'None Selected')}}
      </div>
    </div>
	`
}
