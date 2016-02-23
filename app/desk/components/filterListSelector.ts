
import {Store} from '@ngrx/store';

export class FilterListSelector {
  store: Store<Object>;
  
  constructor(DeskStore) {
    this.store = DeskStore;
  }
  
};

export const FilterListSelectorComponent = {
  controller: FilterListSelector,
  bindings: {
    selectedId: '<',
    listItems: '<',
    filterChange: '&',
    selectItem: '&',
    title: '@',
    placeholder: '@',
    itemName: '&'
  },
  template: `
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>{{::$ctrl.title}}</h3>
        <filter-list-filter
          filter-change="$ctrl.filterChange(filterText)"
          placeholder="$ctrl.placeholder"></filter-list-filter>
      </div>
      <div class="panel-body">
        <ul>
          <li ng-repeat="item in $ctrl.listItems" 
            ng-class="{active: item.id==$ctrl.selectedId}" 
            ng-click="$ctrl.selectItem({itemId: item.id})">
            {{$ctrl.itemName({item:item})}}
          </li>
        </ul>
      </div>
    </div>
	`
}