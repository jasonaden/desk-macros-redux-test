import {Store} from 'redux';

export class DeskAgent {
  store: Store;
  
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