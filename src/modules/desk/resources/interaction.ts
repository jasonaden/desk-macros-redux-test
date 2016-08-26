
import {Resource, defaultReducer} from 'restore';
import {interactionSchema} from './config/schemas';
import {uiResource} from './uiResource';


export const NAME = "INTERACTION";

export interface IInteraction {
  id: number
}

export interface IInteractions extends Map<String, any> {
  result: Number[];
  entities: {customers: Map<Number, IInteraction>};
  adding: boolean;
  loading: boolean;
}

export class Interaction extends uiResource {
  url = '/api/v2/case/:id/interactions';
  public className: string = NAME;
  
  constructor(public $ngRedux, ApiV2Adapter) {
    super($ngRedux, ApiV2Adapter);
  }
  
}
