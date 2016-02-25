import {Store} from '@ngrx/store';

export class DeskAgent {
  store: Store<Object>;
  
  constructor (DeskStore) {
    this.store = DeskStore;
  };
  
}

export const DeskAgentComponent = {
  template: `
    <div ui-view></div>
	`,
  controller: DeskAgent
};