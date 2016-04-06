import {setOpenCaseId} from '../states';

export const routes = ($stateProvider, $urlRouterProvider, $locationProvider) => {
  
  $stateProvider.state('desk.agent.caseDetail', {
    url: '/case/:id',
    resolve: {
      resolveOpenCaseId: ($stateParams, $ngRedux) => {
        $ngRedux.dispatch(setOpenCaseId(parseInt($stateParams.id, 10)));
      }
    },    
    views: {
      '@': {
        template: '<case-detail></case-detail>'    
      }
    }
  });

}
