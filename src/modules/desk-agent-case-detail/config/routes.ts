import * as Immutable from 'immutable';

import {CaseDetail, getCaseDetail, setActiveCaseId, setCaseDetail} from '../states';
import {getCaseById} from '../../desk/resources/case';
import {getUsers} from '../../desk/resources/user';
// import {uiCase} from '../../desk/uiResources/uiCase';

export const routes = ($stateProvider, $urlRouterProvider, $locationProvider) => {
  
  $stateProvider.state('desk.agent.case.detail', {
    url: '/case/:id',
    resolve: {
      // TODO: Adding uiCase just for testing purposes
      resolveCaseDetail: ($stateParams, $ngRedux, Case, User, Note) => {
        const state = $ngRedux.getState();
        const id = parseInt($stateParams.id);
        const detail = getCaseDetail(state, id);
        
        if (detail) {
          $ngRedux.dispatch(setActiveCaseId(id));
        } else {
          const kase = Case.get(id);
          // TODO: when users is ready, switch over to User.get()
          const users = getUsers($ngRedux.getState());

          return Promise.all( [kase || Case.findOne(id), users.size || User.list()] ).then(()=>{
            setupCaseDetail( Case.get(id) )
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
