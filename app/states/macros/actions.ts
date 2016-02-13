

export const SET_MACROS = "SET_MACROS";
export function setMacros(data: Object[]) {
  return {
    type: SET_MACROS,
    data
  }
}

export const SELECT_MACRO = "SELECT_MACRO";
export function selectMacro(data: number) {
  return {
    type: SELECT_MACRO,
    data
  }
}

export const SET_MACRO_FILTER = "SET_MACRO_FILTER";
export function setMacroFilter(data: string, index: number) {
  return {
    type: SET_MACRO_FILTER,
    data: {
      value: data,
      index
    }
  }
}

export const ADD_MACRO_FILTER = "ADD_MACRO_FILTER";
export function addMacroFilter() {
  return {
    type: ADD_MACRO_FILTER
  }
}