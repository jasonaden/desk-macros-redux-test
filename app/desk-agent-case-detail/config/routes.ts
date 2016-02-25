import {caseDetailMod} from '../module';
import {getCases} from '../../desk-agent-case/states';
import {CaseDetailController} from '../components/caseDetail';
import {setOpenCaseId, getOpenCaseId} from '../states';

export const routes = ($stateProvider, $urlRouterProvider, $locationProvider) => {
  
  $stateProvider.state('desk.agent.caseDetail', {
    url: '/case/:id',
    resolve: {
      resolveOpenCaseId: ($stateParams, DeskStore) => {
        DeskStore.dispatch(setOpenCaseId(parseInt($stateParams.id, 10)));
      }
    },    
    views: {
      '@': {
        template: '<case-detail></case-detail>'    
      }
    }
  });

}
