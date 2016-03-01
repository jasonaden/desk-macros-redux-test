export class FilterList {}

export const FilterListComponent = {
  controller: FilterList,
  bindings: {
    listItems: '<',
    selectedId: '<',
    selectItem: '&',
    itemName: '&'
  },
  template: `
    <ul>
      <li ng-repeat="item in $ctrl.listItems" 
        ng-class="{active: item.id==$ctrl.selectedId}" 
        ng-click="$ctrl.selectItem({itemId: item.id})">
        {{$ctrl.itemName({item:item})}}
      </li>
    </ul>
  `
}