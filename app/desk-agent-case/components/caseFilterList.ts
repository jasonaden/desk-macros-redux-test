import {FilterList, FilterListComponent} from '../../desk/components/filterList';

export class CaseFilterList extends FilterList {}

export const CaseFilterListComponent = angular.extend(FilterListComponent, {
  controller: CaseFilterList,
  template: `
    <ul>
      <li ng-repeat="item in $ctrl.listItems" 
        ng-class="{active: item.id==$ctrl.selectedId}" 
        ng-click="$ctrl.selectItem({itemId: item.id})">
        {{'(' + item.macros.length + ' macros) - ' + item.subject}}
      </li>
    </ul>
  `
});