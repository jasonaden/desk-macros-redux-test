import * as Immutable from 'immutable';

import {CaseDetail, getCaseDetail, setActiveCaseId, setCaseDetail} from '../states';
import {getCaseById} from '../../desk/resources/case';

export const routes = ($stateProvider, $urlRouterProvider, $locationProvider) => {
  
  $stateProvider.state('desk.agent.case.detail', {
    url: '/case/:id',
    resolve: {
      resolveCaseDetail: ($stateParams, $ngRedux, Case) => {
        const state = $ngRedux.getState();
        const id = parseInt($stateParams.id);
        const detail = getCaseDetail(state, id);
        
        if (detail) {
          $ngRedux.dispatch(setActiveCaseId(id));
        } else {
          const kase = getCaseById($ngRedux.getState(), id);
          function setupCaseDetail(kase) {
            const caseDetail = new CaseDetail({snapCase: kase, editCase: kase});
            $ngRedux.dispatch(setActiveCaseId(kase.get('id')));
            $ngRedux.dispatch(setCaseDetail({caseId: kase.get('id'), detail: caseDetail}));
          }
          if (kase) {
            setupCaseDetail(kase);
          } else {
            return Case.findOne(id).then(()=>setupCaseDetail(getCaseById($ngRedux.getState(), id)));
          }
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
