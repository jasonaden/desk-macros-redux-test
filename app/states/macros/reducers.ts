import {combineReducers} from 'redux';
import {
  SELECT_MACRO, 
  SET_MACRO_FILTER,
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

function macroFilters (state = [], action): string[] {
  switch (action.type) {
    case ADD_MACRO_FILTER:
      return [...state, ''];
    case SET_MACRO_FILTER:
      let idx = action.data.index;
      return [
        ...state.slice(0, idx),
        action.data.filter,
        ...state.slice(idx + 1)
      ];
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

const macroData = combineReducers({
  macros
})

export const rootReducer = combineReducers({
  macroFilters,
  macros
})