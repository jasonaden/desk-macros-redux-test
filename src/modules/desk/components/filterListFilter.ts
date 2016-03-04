import {Store} from 'redux';

export class FilterListFilter {
  constructor() {}  
}

export const FilterListFilterComponent = {
  controller: FilterListFilter,
  bindings: {
    filterChange: '&',
    placeholder: '@'
  },
  template: `
    <form>
      <input 
        class="form-control" 
        placeholder="{{::$ctrl.placeholder || 'Filter'}}" 
        ng-model="$ctrl.filterText" 
        ng-change="$ctrl.filterChange({filter: $ctrl.filterText})">
    </form>
  `
}