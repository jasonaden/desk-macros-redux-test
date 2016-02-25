import {caseDetailMod} from '../module';
import {cases} from '../../desk-agent-case/states/selectors';
import {CaseDetailController} from '../components/caseDetail';
import {SET_OPEN_CASE, openCase} from '../states/actions';

export const routes = ($stateProvider, $urlRouterProvider, $locationProvider) => {
  
  $stateProvider.state('desk.agent.caseDetail', {
    url: '/case/:id',
    resolve: {
      resolvedCase: ($q, $timeout, $stateParams, DeskStore) => {
        DeskStore.dispatch(openCase(cases(DeskStore.getState()).find((kase) => kase.id == $stateParams.id)))
      }
    },    
    views: {
      '@': {
        template: '<case-detail></case-detail>'    
      }
    }
  });

}
