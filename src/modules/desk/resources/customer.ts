import {Action} from 'flux-standard-action';
import {normalize, Schema, arrayOf} from 'normalizr';

import {Resource, defaultReducer} from 'restore';
import { uiResource } from './uiResource';

import {customerSchema} from './config/schemas';


export const NAME = "CUSTOMER";
export const CLASS_NAME = "CUSTOMER";
export const LIST_NAME = "CUSTOMERLIST";

// TODO: Need to fill this in -- see Case
// Customer _link items
const relateds = {
    case: {
        class: 'Case',
        uiResource: 'uiCase'
    }
}


export class Customer extends uiResource {
  url = '/api/v2/customers';
  public className: string = NAME;
  
  constructor(public $ngRedux, ApiV2Adapter) {
    super($ngRedux, ApiV2Adapter);
  }
  
/*** 
 * Interface for backend data store interactions
 *  
 */

  /***** 
   * Synchronous interface 
  * */

  /***** 
   * Asynchronous interface 
  * */

}
