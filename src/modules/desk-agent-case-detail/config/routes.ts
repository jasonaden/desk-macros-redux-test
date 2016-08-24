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
          // TODO: Convert to using Case.get()
          const kase = getCaseById($ngRedux.getState(), id);
          const users = getUsers($ngRedux.getState());

          return Promise.all( [kase || Case.findOne(id), users.size || User.list()] ).then(()=>{
            setupCaseDetail( Case.get(id) )
          });
          /*.then(()=>{

            // Note.findOne( id, 1)

            // TODO: commented out original to test populateRelated() function
            // return setupCaseDetail(getCaseById($ngRedux.getState(), id))

            Case.populateRelatedList(id, 'notes')
            .then( (data) => {
              console.log("***** Got the related notes", data);
            })

            return Case.populateRelated(id, 'customer')
            .then( (data) => {

              console.log("**** about to synchronously get the related customer", data)

              let tCustomer = Case.getRelated(id, 'customer');

              console.log("**** get Related customer", tCustomer.toJS()) 

              return setupCaseDetail( Case.get(id) )
            })
        
            // TODO: Test populateGetRelated()
            // return Case.populateGetRelated(id, 'customer')
            // .then( (data) => {
            //   console.log("**** get Related customer", data.toJS()) 

            //   // Using uiCase to get the case because we know it will be in the store
            //   return setupCaseDetail( Case.get(id) )
            // })
          });*/

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
