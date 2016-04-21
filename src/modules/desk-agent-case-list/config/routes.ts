import {caseListMod} from '../module';
import {setItems} from '../states';
import {getCases} from '../../desk/resources/case';

export const routes = ($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.when('/', '/cases').when('', '/cases');

  $stateProvider.state('desk.agent.case.list', {
    resolve: {
      filterItems: ($ngRedux, resolvedCases) => {
        return $ngRedux.dispatch(setItems(getCases($ngRedux.getState())));
      }
    },
    url: '/cases',
    views: {
      '@': { template: '<test-area></test-area><case-list></case-list>' }
    }
  })
}
