import {Action} from 'flux-standard-action';
import {normalize, Schema, arrayOf} from 'normalizr';

import {Resource, defaultReducer} from 'restore';
import { uiResource } from './uiResource';

import {customerSchema} from './config/schemas';
import { customerRelateds as relateds } from './relatedToClass';


export const NAME = "CUSTOMER";
export const CLASS_NAME = "CUSTOMER";
export const LIST_NAME = "CUSTOMERLIST";

export interface ICustomer {
  id: number
}

export interface ICustomers extends Map<String, any> {
  result: Number[];
  entities: {customers: Map<Number, ICustomer>};
  adding: boolean;
  loading: boolean;
}

export class Customer extends uiResource {
  url = '/api/v2/customers';
  public className: string = NAME;
  public type = CLASS_NAME.toLowerCase();

  
  constructor(public $ngRedux, ApiV2Adapter, $injector) {
    super($ngRedux, ApiV2Adapter, $injector);
  }
  
  get state () {
    return this.store.getState().entities.customer;
  }
  
/*** 
 * Interface for backend data store interactions
 *  
 */
  // TODO 

  /***** 
   * Synchronous interface 
  * */

  get( id: (number | string) ): Object {
    return super.get( this.type, id );
  }

  getRelated( id: (number | string), relName: string ): Array<any> {
    let baseItem = this.get( id );
    return super.getRelated( baseItem, relateds, relName );
  }

  /***** 
   * Asynchronous interface 
  * */

  populateRelated(id: string, relName: string): PromiseLike<any> {
    if( ! id || ! relName ) return;

    let baseItem = this.get(id)
    return super.populateRelated( baseItem, relateds, relName );
  }
  

}

export const customer = defaultReducer(NAME);
