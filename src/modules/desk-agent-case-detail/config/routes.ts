import * as Immutable from 'immutable';

import {CaseDetail, getCaseDetail, setActiveCaseId, setCaseDetail} from '../states';
import {getCaseById} from '../../desk/resources/case';

export const routes = ($stateProvider, $urlRouterProvider, $locationProvider) => {
  
  $stateProvider.state('desk.agent.case.detail', {
    url: '/case/:id',
    resolve: {
      resolveCaseDetail: ($stateParams, $ngRedux, resolvedCases) => {
        const state = $ngRedux.getState();
        const id = parseInt($stateParams.id);
        const detail = getCaseDetail(state, id);
        
        if (detail) {
          $ngRedux.dispatch(setActiveCaseId(id));
        } else {
          const kase = getCaseById($ngRedux.getState(), id);
          const caseDetail = new CaseDetail({snapCase: kase, editCase: kase});
          $ngRedux.dispatch(setActiveCaseId(kase.get('id')));
          $ngRedux.dispatch(setCaseDetail({caseId: kase.get('id'), detail: caseDetail}));
        }
        return;
      }
    },    
    views: {
      '@': {
        template: '<case-detail></case-detail>'    
      }
    }
  });

}
