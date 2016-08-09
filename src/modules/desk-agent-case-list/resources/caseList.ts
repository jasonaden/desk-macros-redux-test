import {Action} from 'flux-standard-action';
import * as Immutable from 'immutable';

import {ResourceList, defaultListReducer, $httpPersistor} from 'restore';
import {caseSchema} from '../../desk/resources/config/schemas';
import {ApiV2Adapter} from '../../desk/resources/config/apiv2-adapter';
import * as ng from 'angular';

/**
 * Module name
 */
export const NAME = "CASE_LIST";

export class CaseList extends ResourceList<any> {
  public url = '/cases';
  public className = 'case';
  
  private defaultParams;
  private $q;

  constructor($q, $http, $ngRedux) {
    super('caseList', $ngRedux, new ApiV2Adapter(caseSchema, $ngRedux));

    this.$q = $q;

    this.adapter.persistor = new $httpPersistor();
    $httpPersistor.setQ($q);
    $httpPersistor.setHttp($http);

    this.defaultParams = {
      url: this.url,
      baseUrl: this.adapter.baseUrl
    }
  }
  
  beforeFind(params = {}) {
    return this.$q.all([Object.assign({}, this.defaultParams, params)]);
  }
}

export const CaseListReducer = defaultListReducer(NAME);

export const getCases = (state) => {
  return state.caseListStore.result;
}