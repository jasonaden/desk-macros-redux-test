import {deskAgentMod} from '../module';

export const routes = ($stateProvider, $urlRouterProvider, $locationProvider) => {
  $stateProvider.state('desk.agent', {
    abstract: true
  });
}