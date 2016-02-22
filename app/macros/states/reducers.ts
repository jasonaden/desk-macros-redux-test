
import {Reducer, Action, combineReducers} from '@ngrx/store';

import {
  SELECT_MACRO, 
  SET_MACRO_FILTER,
  SET_FOLDER_FILTER,
  ADD_MACRO_FILTER,
  SET_MACROS
} from './actions';


const selectedMacro:Reducer<Object> = (state:Object = null, action:Action) => {
  switch (action.type) {
    case SELECT_MACRO:
      return action.payload;
    default:
      return state;
  }
}

const macroFilter:Reducer<string> = (state:string = '', action:Action) => {
  switch (action.type) {
    case SET_MACRO_FILTER:
      return action.payload;
    default:
      return state;
  }
}

const folderFilter:Reducer<string> = (state:string = '', action:Action) => {
  switch (action.type) {
    case SET_FOLDER_FILTER:
      return action.payload;
    default:
      return state;
  }
}

const macros:Reducer<Object[]> = (state:Object[] = [], action:Action) => {
  switch (action.type) {
		case SET_MACROS:
			return action.payload.slice(0);
		default:
			return state;
	}
}

export const macroReducers = combineReducers({
  macroFilter,
  folderFilter,
  macros
})

// function selectedMacro(state = null, action): number {
//   switch (action.type) {
//     case SELECT_MACRO:
//       return action.data;
//     default:
//       return state;
//   }
// }

// function macroFilter (state = '', action): string {
//   switch (action.type) {
//     case SET_MACRO_FILTER:
//       return action.data;
//     default:
//       return state;
//   }
// }

// function folderFilter (state = '', action): string {
//   switch (action.type) {
//     case SET_FOLDER_FILTER:
//       return action.data;
//     default:
//       return state;
//   }
// }

// function macros (state = [], action): Object[] {
//   switch (action.type) {
// 		case SET_MACROS:
// 			return action.data.slice(0);
// 		default:
// 			return state;
// 	}
// }

// export const rootReducer = combineReducers({
//   macroFilter,
//   folderFilter,
//   macros
// })