import {caseListMod} from '../module';
import {setItems} from '../states';
import {getListCases} from '../../desk/resources/case';
import {Filter, setFilter, setActiveFilterId} from '../states';

export const routes = ($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.when('/', '/cases').when('', '/cases');

  function setupFilterDetails(store, items) {
    const filter = new Filter({
      filterId: 1,
      items
    });
    store.dispatch(setFilter(filter));
    store.dispatch(setActiveFilterId(filter.filterId));  
  }

  $stateProvider.state('desk.agent.case.list', {
    resolve: {
      resolvedFilter: ($ngRedux, Case) => {
        let cases = getListCases($ngRedux.getState());
        
        if (cases.size) {
      
          setupFilterDetails($ngRedux, cases);
        
        } else {
          return Case.find().then(() => {
            
            let cases = getListCases($ngRedux.getState());
            
            return setupFilterDetails($ngRedux, cases);

          });
        }
      }
    },
    url: '/cases',
    views: {
      '@': { template: '<test-area></test-area><case-list></case-list>' }
    }
  })
}
