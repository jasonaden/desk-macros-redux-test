import {Store} from '@ngrx/store';
import {selectedMacro} from '../states/selectors';
//import {selectMacro} from '../states/actions';

export class MacroList {
  store: Store<Object>;
  
  constructor (DeskStore) {
    this.store = DeskStore;
  }
  
  get selectedMacro () {
    return selectedMacro(this.store.getState());
  }
  
  setSelectedMacro (index: number) {
    this.store.dispatch(selectMacro(index));
  }
}

export const MacroListComponent = {
  controller: MacroList,
  bindings: {
    macros: '<'
  },
	template: `
    <ul>
      <li *ngFor="#macro of macros">
        {{macro.name}}
      </li>
    </ul>
	`
}