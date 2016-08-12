import {Action} from 'flux-standard-action';
import * as Immutable from 'immutable';
import {appSchema} from '../../desk/resources/config/schemas';
import {ResourceList, defaultListReducer} from 'restore';
import {getCaseByURI} from '../../desk/resources/case';

import * as ng from 'angular';

/**
 * Module name
 */
export const NAME = "CASELIST";

export class CaseList extends ResourceList<any> {
  public url = '/cases?embed=customer';
  public className = 'case';
  //public listName = 'CASELIST';

  private defaultParams;

  constructor($ngRedux, ApiV2Adapter) {
    super('caseList', $ngRedux, ApiV2Adapter);

    this.defaultParams = {
      url: this.url
    }
  }

  beforeFind(config = {}) {
    config.params = Object.assign({}, this.defaultParams, config.params)
    config.listName = this.listName;
    return config;
  }
  
}

export const CaseListReducer = defaultListReducer(NAME);

export const getCases = (state) => {
  if (state.caseListStore.page && state.caseListStore.result.get(state.caseListStore.page)){
    return state.caseListStore.result.get(state.caseListStore.page).map( (r) => {
      return getCaseByURI(state, r);
    });
  } else {
    return Immutable.List();
  }
}
