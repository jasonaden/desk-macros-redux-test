
import {$q, $http} from '../../../../ng';

import {IResourceAdapter, ResourceAdapter, flattenEmbedded} from '../../../../resources';

/*
* Base Adapter for an API
*/
export class ApiV2Adapter extends ResourceAdapter implements IResourceAdapter {

  // Base URL for the API
  baseUrl: string = 'http://localhost:8888/api/v2';
  
  static generateSlug = function (entity) {
    let key = (entity._links && entity._links.self && entity._links.self.href) || entity.id;
    if (!key) {
      return;
    }
    if (key.indexOf('/api/v2') == 0) {
      key = key.slice(7)
    }
    return key;
  }
  
  constructor () {
    super($http, $q);
    
    /**
     * Extend transformResponse by adding HAL parsing.
     */
    this.transformResponse = (data, headers) => {
      return flattenEmbedded(super.transformResponse(data, headers), headers); 
    }
  }
  
  generateSlug (entity: any) {
    return ApiV2Adapter.generateSlug(entity);
  }

}