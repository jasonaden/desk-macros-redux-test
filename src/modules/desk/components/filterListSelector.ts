

export class FilterListSelector {};

export const FilterListSelectorComponent: ng.IComponentOptions = {
  controller: FilterListSelector,
  bindings: {
    title: '@',
  },
  transclude: {
    filter: 'filter',
    list: 'list'
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