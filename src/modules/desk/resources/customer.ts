import {Action} from 'flux-standard-action';
import {normalize, Schema, arrayOf} from 'normalizr';

import {Resource} from './resource';

import {customerSchema} from './schemas';

export const NAME = "CUSTOMER";

export interface ICustomer {
  id: number
}

export interface ICustomers extends Map<String, any> {
  result: Number[];
  entities: {customers: Map<Number, ICustomer>};
  adding: boolean;
  loading: boolean;
}

export class Customer extends Resource<ICustomer> {
  url = '/customers';
  public className: string = NAME;
  
  constructor($injector, ApiV2Adapter) {
    super($injector, ApiV2Adapter, customerSchema);
  }
  
  get state () {
    return this.store.getState().entities.customers;
  }
  
  // ADD METHODS TO GET DATA OUT OF THE RESOURCE.
  
}

export const customers = Customer.itemsReducer(NAME);
