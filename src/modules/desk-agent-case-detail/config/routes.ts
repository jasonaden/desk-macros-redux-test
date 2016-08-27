import * as Immutable from 'immutable';

import {CaseDetail, getCaseDetail, setActiveCaseId, setCaseDetail} from '../states';

export const routes = ($stateProvider, $urlRouterProvider, $locationProvider) => {
  
  $stateProvider.state('desk.agent.case.detail', {
    url: '/case/:id',
    resolve: {
      resolveCaseDetail: ($stateParams, $ngRedux, Case, User, Note) => {
        const state = $ngRedux.getState();
        const id = parseInt($stateParams.id);
        const detail = getCaseDetail(state, id);
        
        if (detail) {
          $ngRedux.dispatch(setActiveCaseId(id));
        } else {
          return Promise.all( [Case.getAsync(id)] )
          .then( ( [kase] )=>{
            setupCaseDetail( kase )
          });
        }
        
        function setupCaseDetail(kase) {
          const caseDetail = new CaseDetail({snapCase: kase, editCase: kase});
          $ngRedux.dispatch(setCaseDetail({caseId: kase.get('id'), detail: caseDetail}));
          $ngRedux.dispatch(setActiveCaseId(kase.get('id')));
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
