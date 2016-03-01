import {caseListMod} from '../module';

export const routes = ($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.when('/', '/cases').when('', '/cases');

  $stateProvider.state('desk.agent.cases', {
    url: '/cases',
    views: {
      '@': { template: '<case-list></case-list>' }
    }
  })
}
