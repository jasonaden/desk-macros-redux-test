import {setOpenCase} from '../states';
import {getCaseById} from '../../desk/resources/case';

export const routes = ($stateProvider, $urlRouterProvider, $locationProvider) => {
  
  $stateProvider.state('desk.agent.case.detail', {
    url: '/case/:id',
    resolve: {
      resolveOpenCase: ($stateParams, $ngRedux, resolvedCases) => {
        $ngRedux.dispatch(setOpenCase(getCaseById($ngRedux.getState(), parseInt($stateParams.id, 10))));
      }
    },    
    views: {
      '@': {
        template: '<case-detail></case-detail>'    
      }
    }
  });

}
