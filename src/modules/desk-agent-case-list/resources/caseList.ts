import {Action} from 'flux-standard-action';
import * as Immutable from 'immutable';
import {appSchema} from '../../desk/resources/config/schemas';
import {ResourceList, defaultListReducer, $httpPersistor} from 'restore';
import {getCaseByURI} from '../../desk/resources/case';

import * as ng from 'angular';

/**
 * Module name
 */
export const NAME = "CASELIST";

export class CaseList extends ResourceList<any> {
  public url = '/cases?embed=customer';
  public className = 'case';
  //public listName = 'caseList';

  private defaultParams;

  constructor($ngRedux, ApiV2Adapter) {
    super('caseList', $ngRedux, ApiV2Adapter);

    this.defaultParams = {
      url: this.url,
      baseUrl: this.adapter.baseUrl
    }
  }

  beforeFind(config = {}) {
    config.params = Object.assign({}, this.defaultParams, config.params)
    config.listName = this.listName;
    return Promise.all([config]);
  }

}

export const CaseListReducer = defaultListReducer(NAME);

export const getCases = (state) => {
  return state.caseListStore.result.map( (r) => {
    return getCaseByURI(state, r);
  });
}