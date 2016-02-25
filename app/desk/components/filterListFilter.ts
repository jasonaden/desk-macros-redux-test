import {Store} from 'redux';

export class FilterListFilter {
  store: Store;
  
  constructor(DeskStore) {
    this.store = DeskStore;
  }
  
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