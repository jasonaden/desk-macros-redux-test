import {stateGo} from 'redux-ui-router';

import {getActiveFilter, getFilteredItems, setSelectedId, setFilterText} from '../states';

const mapStateToThis = (state) => {
  return {
    filter: getActiveFilter(state).toJS(),
    filteredItems: getFilteredItems(state).toJS()
  };
}

const mapDispatchToThis = (dispatch) => {
  return {
    onSelect: (id:number) => {
      dispatch(setSelectedId(id));
    },
    onFilterChange: (filter:string) => {
      dispatch(setFilterText(filter));
    },
    goToCase: (id:number) => {
      dispatch(stateGo('desk.agent.case.detail', {id}));
    }
  }
}

export class CaseList {
  
  constructor ($scope, $ngRedux, Case, RxPoller) {
    let unsubscribe = $ngRedux.connect(mapStateToThis, mapDispatchToThis)(this);
    let poller = new RxPoller('case-list', { interval:20000 })
      .setAction(() => Case.find())
      .start();

    $scope.$on('$destroy', () => {
      unsubscribe();
      poller.stop();
    });
  }
  
  getCaseDisplay (kase) {
    return kase.subject;
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
