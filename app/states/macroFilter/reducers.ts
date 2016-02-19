import {combineReducers} from 'redux';
import {
  SELECT_MACRO, 
  SET_MACRO_FILTER,
  SET_FOLDER_FILTER,
  ADD_MACRO_FILTER,
  SET_MACROS
} from './actions';

function selectedMacro(state = null, action): number {
  switch (action.type) {
    case SELECT_MACRO:
      return action.data;
    default:
      return state;
  }
}

function macroFilter (state = '', action): string {
  switch (action.type) {
    case SET_MACRO_FILTER:
      return action.data;
    default:
      return state;
  }
}

function folderFilter (state = '', action): string {
  switch (action.type) {
    case SET_FOLDER_FILTER:
      return action.data;
    default:
      return state;
  }
}

function macros (state = [], action): Object[] {
  switch (action.type) {
		case SET_MACROS:
			return action.data.slice(0);
		default:
			return state;
	}
}

export const rootReducer = combineReducers({
  macroFilter,
  folderFilter,
  macros
})