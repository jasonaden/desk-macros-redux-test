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

  
  constructor(public $ngRedux, ApiV2Adapter) {
    super($ngRedux, ApiV2Adapter);
  }

}