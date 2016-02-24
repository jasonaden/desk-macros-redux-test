
import {macroList} from './data/macros';
import {caseList} from './data/cases';
import {setMacros} from './desk-agent-case-macros/states/actions';
import {setCases} from './desk-agent-case/states/actions';

export class App {
  
  constructor (DeskStore) {
    // TODO: This just pre-load's data. Maybe work in $http or some kind of fetch
    let store = DeskStore;
    store.subscribe(_ => {
      console.log(store.getState());
    })
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
