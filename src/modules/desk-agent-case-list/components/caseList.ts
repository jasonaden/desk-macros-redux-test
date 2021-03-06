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
  private _poller;
  public filteredItems;
  
  constructor ($scope, public $ngRedux, public Case, RxPoller) {
    let unsubscribe = $ngRedux.connect(mapStateToThis, mapDispatchToThis)(this);
    
    // restore paused poller
    this._poller = RxPoller.getPoller('case-list');
    if (!this._poller) {
      this._poller = new RxPoller('case-list', { interval:20000 });
      this._poller.setAction(() => Case.list());
    }
    //this._poller.start();

    $scope.$on('$destroy', () => {
      unsubscribe();
      this._poller.stop();
    });
  }

  delete (id) {
    this.Case.destroy(id);
  }

  createCase () {
    this.Case.add({
      message: {
        status: 'draft',
        direction: 'out',
        to: 'jmumm@salesforce.com',
        subject: 'Brand New Case ' + new Date().toDateString()
      },
      status: 'new',
      type: 'email',
      _links: {
        locked_by: this.filteredItems[0]._links.assigned_user,
        customer: this.filteredItems[0]._links.customer,
      }
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
    <input type="button" class="btn btn-primary" ng-click="$ctrl.createCase()" value="Create New Case"/>
    <input type="button" class="btn btn-primary" ng-show="$ctrl.filter.selectedId > -1" ng-click="$ctrl.goToCase($ctrl.filter.selectedId)" value="Go To Case"/>
    <input type="button" class="btn btn-primary" ng-show="$ctrl.filter.selectedId > -1" ng-click="$ctrl.delete($ctrl.filter.selectedId)" value="Delete Case"/>
    
	`
}
