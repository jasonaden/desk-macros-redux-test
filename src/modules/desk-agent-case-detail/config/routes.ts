import * as Immutable from 'immutable';

import {CaseDetail, getCaseDetail, setActiveCaseId, setCaseDetail} from '../states';
import {getCaseById} from '../../desk/resources/case';
import {getUsers} from '../../desk/resources/user';

export const routes = ($stateProvider, $urlRouterProvider, $locationProvider) => {
  
  $stateProvider.state('desk.agent.case.detail', {
    url: '/case/:id',
    resolve: {
      resolveCaseDetail: ($stateParams, $ngRedux, Case, User) => {
        const state = $ngRedux.getState();
        const id = parseInt($stateParams.id);
        const detail = getCaseDetail(state, id);
        
        if (detail) {
          $ngRedux.dispatch(setActiveCaseId(id));
        } else {
          const kase = getCaseById($ngRedux.getState(), id);
          const users = getUsers($ngRedux.getState());

          return Promise.all( [kase || Case.findOne(id), users.size || User.list()] )
          .then(()=>{
            return setupCaseDetail(getCaseById($ngRedux.getState(), id))
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
