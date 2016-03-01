import {deskMod} from '../module';

export const routes = ($stateProvider, $urlRouterProvider, $locationProvider) => {
  //$locationProvider.html5Mode(true);
  
  $stateProvider.state('desk', {
    abstract: true
  });

}
