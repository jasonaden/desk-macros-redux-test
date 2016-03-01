export class FilterListItem {}

export const FilterListItemComponent = {
  controller: FilterListItem,
  bindings: {
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