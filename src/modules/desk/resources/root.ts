
// TODO: Should this be renamed to 'states.ts' because all the other 
//  reducers are in files called 'states.ts'?

import {defaultGenericListReducer, defaultGenericReducer} from 'restore';

export const entityReducer = defaultGenericReducer();
export const listReducer = defaultGenericListReducer();