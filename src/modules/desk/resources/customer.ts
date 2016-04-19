import {Action} from 'flux-standard-action';
import {normalize, Schema, arrayOf} from 'normalizr';

import {Resource, defaultReducer} from '../../../resources';

import {customerSchema} from './config/schemas';

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
  
  constructor(public $ngRedux, public $http, public $q, ApiV2Adapter) {
    super($ngRedux, $http, $q, ApiV2Adapter, customerSchema);
  }
  
  get state () {
    return this.store.getState().entities.customer;
  }
  
  // ADD METHODS TO GET DATA OUT OF THE RESOURCE.
  
}

export const customer = defaultReducer(NAME);
