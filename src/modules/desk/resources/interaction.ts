import {Action} from 'flux-standard-action';
import {normalize, Schema, arrayOf} from 'normalizr';

import {Resource} from '../../../resources';


import {interactionSchema} from './config/schemas';


export const NAME = "INTERACTION";

// TODO: Figure out how to handle interactions generically


// export interface ICase {
//   id: number,
//   subject: string,
//   macros: Number[]
// }

// export interface ICases extends Map<String, any> {
//   result: Number[];
//   entities: {users: Map<Number, ICase>};
//   adding: boolean;
//   loading: boolean;
// }

// export class Case extends Resource<ICase> {
//   url = '/cases';
//   public className: string = NAME;
  
//   constructor($injector, ApiV2Adapter) {
//     super($injector, ApiV2Adapter);
//   }
  
//   get state () {
//     return this.store.getState().entities.cases;
//   }
  
//   // ADD METHODS TO GET DATA OUT OF THE RESOURCE.
  
// }

// // CASES
// export const SET_CASES = "SET_CASES";
// export function setCases(payload: Object[]): Action<Object[]> {
//   return {
//     type: SET_CASES,
//     payload
//   }
// };

// export const APPLY_MACRO = 'APPLY_MACRO';
// export const MACRO_APPLY_ERROR = 'MACRO_APPLY_ERROR';
// export function applyMacro (payload: Object): Action<Object> {
//   return {
//     type: APPLY_MACRO, 
//     payload
//   };
// }

// export const cases = Case.itemsReducer(NAME);

// export const getCases = (state): ICase[] => {
//   return state.entities.cases;
// }

// export const getCaseById = (state, id):ICase => getCases(state).find(kase => kase.id==id);

