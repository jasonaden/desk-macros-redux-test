import {caseDetailMod} from '../module';
import {getCases} from '../../desk-agent-case/states';
import {CaseDetailController} from '../components/caseDetail';
import {SET_OPEN_CASE, setOpenCase} from '../states';

export const routes = ($stateProvider, $urlRouterProvider, $locationProvider) => {
  
  $stateProvider.state('desk.agent.caseDetail', {
    url: '/case/:id',
    resolve: {
      resolvedCase: ($q, $timeout, $stateParams, DeskStore) => {
        DeskStore.dispatch(setOpenCase(getCases(DeskStore.getState()).find((kase) => kase.id == $stateParams.id)))
      }
    },    
    views: {
      '@': {
        template: '<case-detail></case-detail>'    
      }
    }
  });

}
