
export class CaseFilter {
  constructor () { }
};
export const CaseFilterComponent = {
  bindings: {
    placeholder: '@',
    filterChange: '&'
  },
  template:`
    <form>
      <input class="form-control" placeholder="{{::$ctrl.placeholder || 'Filter'}}" 
        ng-model="$ctrl.filterText" ng-change="$ctrl.filterChange({filter: $ctrl.filterText})">
    </form>
	`,
  controller: CaseFilter
}

