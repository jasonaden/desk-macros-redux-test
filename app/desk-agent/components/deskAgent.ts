import {Store} from '@ngrx/store';

export class DeskAgent {
  store: Store<Object>;
  
  constructor (DeskStore) {
    this.store = DeskStore;
  };
  
}

export const DeskAgentComponent = {
  template: `
    <case-list></case-list>
	`,
  controller: DeskAgent
};