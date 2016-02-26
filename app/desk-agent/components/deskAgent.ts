import {Store} from 'redux';

export class DeskAgent {
  store: Store;
  
  constructor ($ngRedux) {
    this.store = $ngRedux;
  };
  
}

export const DeskAgentComponent = {
  template: `
    <div ui-view></div>
	`,
  controller: DeskAgent
};