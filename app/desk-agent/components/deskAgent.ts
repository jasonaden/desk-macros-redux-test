import {Store} from '@ngrx/store';

import {setMacros} from '../../macros/states/actions';
import {setCases} from '../..//cases/states/actions';

import {macros} from '../../macros/states/selectors';
import {cases} from '../../cases/states/selectors';

export class DeskAgent {
  store: Store<Object>;
  
  constructor (AppStore) {
    this.store = AppStore;
  };
  
}

export const DeskAgentComponent = {
  template: `
    <macro-apply></macro-apply>
    <hr/>
    <div class="row">
      <div class="col-md-3">
        <case-selector></case-selector>
      </div>
      <div class="col-md-3">
        <macro-selector></macro-selector>
      </div>
      <div class="col-md-3">
        <macro-folder-selector></macro-folder-selector>
      </div>
    </div>
	`,
  controller: DeskAgent
};