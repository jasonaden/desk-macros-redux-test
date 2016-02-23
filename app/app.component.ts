
import {macroList} from './data/macros';
import {caseList} from './data/cases';
import {setMacros} from './macros/states/actions';
import {setCases} from './cases/states/actions';

export class App {
  
  constructor (AppStore) {
    // TODO: This just pre-load's data. Maybe work in $http or some kind of fetch
    let store = AppStore;
    store.dispatch(setMacros(macroList));
    store.dispatch(setCases(caseList));
  };
  
}

export const AppComponent = {
  template: `
    <desk-agent></desk-agent>
	`,
  controller: App
};
