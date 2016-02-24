

export class FilterListSelector {};

export const FilterListSelectorComponent = {
  controller: FilterListSelector,
  bindings: {
    //selectedId: '<',
    //listItems: '<',
    //filterChange: '&',
    //selectItem: '&',
    title: '@',
    //placeholder: '@',
    //itemName: '&'
  },
  transclude: {
    filter: 'filterListFilter',
    list: 'filterList'
  },
  template: `
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>{{::$ctrl.title}}</h3>
        <div ng-transclude='filter'></div>
      </div>
      <div class="panel-body">
        <div ng-transclude='list'></div>
      </div>
    </div>
	`
}