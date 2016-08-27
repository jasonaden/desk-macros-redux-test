import {caseListMod} from '../module';
import {setItems} from '../states';
import {Filter, setFilter, setActiveFilterId} from '../states';

export const routes = ($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.when('/', '/cases').when('', '/cases');

  function setupFilterDetails(store, items) {
    const filter = new Filter({
      filterId: 1,
      items
    });
    store.dispatch(setFilter(filter));
    store.dispatch(setActiveFilterId(filter.get('filterId')));  
  }

  $stateProvider.state('desk.agent.case.list', {
    resolve: {
      resolvedFilter: ($ngRedux, Case) => {
      
        // Gets the existing list of cases or fetches if needed
        return Case.getListAsync()
        .then( (list) => {
          return setupFilterDetails($ngRedux, list);
        })

        // TODO: changes not currently working (8/26/16), not important
        //  enought to muck with now. See note in apiv2-adapter for what needs to be 
        //  looked at. 
        // return Case.changes()
        // .then( () => {
        //   return setupFilterDetails($ngRedux, list);
        // })
      }
    },
    url: '/cases',
    views: {
      '@': { template: '<test-area></test-area><case-list></case-list>' }
    }
  })
}
