
import {getActiveFilter, getFilteredItems, setSelectedId, setFilterText} from '../states';

const mapStateToThis = (state) => {
  return {
    filter: getActiveFilter(state).toJS(),
    filteredItems: getFilteredItems(state)
  };
}

const mapDispatchToThis = (dispatch) => {
  return {
    onSelect: (id:number) => {
      dispatch(setSelectedId(id));
    },
    onFilterChange: (filter:string) => {
      dispatch(setFilterText(filter));
    }
  }
}

export class CaseList {
  $state: {go: (string, {id: number}) => void};

  constructor ($scope, $state, $ngRedux) {
    this.$state = $state;

    let unsubscribe = $ngRedux.connect(mapStateToThis, mapDispatchToThis)(this);
    $scope.$on('$destroy', unsubscribe);
  }
  
  getCaseDisplay (kase) {
    return kase.subject;
  }
  
  goToCase (caseId: number) {
    return this.$state.go('desk.agent.case.detail', {id: caseId});
  }
  
};

export const CaseListComponent = {
  controller: CaseList,
	template: `
    <filter-list-selector title="Select a case">
      <filter>
        <filter-list-filter
          filter-change="$ctrl.onFilterChange(filter)"
          placeholder="Filter cases"></filter-list-filter>
      </filter>
      <list>
        <filter-list
          selected-id="$ctrl.filter.selectedId"
          list-items="$ctrl.filteredItems"
          select-item="$ctrl.onSelect(itemId)"
          item-name="$ctrl.getCaseDisplay(item)"></filter-list>
      </list>
    </filter-list-selector>
    <input type="button" class="btn btn-primary" ng-show="$ctrl.filter.selectedId > -1" ng-click="$ctrl.goToCase($ctrl.filter.selectedId)" value="Go To Case"/>
	`
}
