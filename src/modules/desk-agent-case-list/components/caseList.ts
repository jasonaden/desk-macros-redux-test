import {Store} from 'redux';

import {ICase} from '../../desk-agent-case/states';
import {getCaseFilter, setSelectedCaseId, setCaseFilter, getSelectedCase, getSelectedCaseId, getFilteredCases} from '../states';

const mapStateToThis = (state) => {
  return {
    selectedCaseId: getSelectedCaseId(state),
    selectedCase: getSelectedCase(state),
    caseFilter: getCaseFilter(state),
    filteredCases: getFilteredCases(state)
  };
}

const mapDispatchToThis = (dispatch) => {
  return {
    onSelectCase: (caseId:number) => {
      dispatch(setSelectedCaseId(caseId));
    },
    onFilterChange: (filter:string) => {
      dispatch(setCaseFilter(filter));
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
  
  getCaseDisplay (kase: ICase) {
    return kase.subject;
  }
  
  goToCase (caseId: number) {
    return this.$state.go('desk.agent.caseDetail', {id: caseId});
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
          selected-id="$ctrl.selectedCaseId"
          list-items="$ctrl.filteredCases"
          select-item="$ctrl.onSelectCase(itemId)"
          item-name="$ctrl.getCaseDisplay(item)"></filter-list>
      </list>
    </filter-list-selector>
    <input type="button" class="btn btn-primary" ng-show="$ctrl.selectedCaseId > -1" ng-click="$ctrl.goToCase($ctrl.selectedCaseId)" value="Go To Case"/>
	`
}
