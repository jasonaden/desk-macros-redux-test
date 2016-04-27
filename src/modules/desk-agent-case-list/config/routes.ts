import {caseListMod} from '../module';
import {setItems} from '../states';
import {getCases} from '../../desk/resources/case';
import {Filter, setFilter, setActiveFilterId} from '../states';

export const routes = ($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.when('/', '/cases').when('', '/cases');

  $stateProvider.state('desk.agent.case.list', {
    resolve: {
      resolvedFilter: ($ngRedux, resolvedCases) => {
        const filter = new Filter({
          filterId: 1,
          items: getCases($ngRedux.getState())
        });
        $ngRedux.dispatch(setFilter(filter));
        $ngRedux.dispatch(setActiveFilterId(filter.filterId));
      }
    },
    url: '/cases',
    views: {
      '@': { template: '<test-area></test-area><case-list></case-list>' }
    }
  })
}
