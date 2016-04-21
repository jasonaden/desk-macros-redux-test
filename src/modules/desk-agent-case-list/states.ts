import {createSelector} from 'reselect';
import {Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import * as Immutable from 'immutable';

import {ICase, getCases} from '../desk/resources/case';

export const Filter = Immutable.Record({
  filterId: -1,
  sortDirection: 'desc',
  sortField: 'updated_at',
  routingEnabled: false,
  active: true,
  group: null,
  user: null,
  items: Immutable.Set(),
  actions: Immutable.List(),
  selectedId: -1,
  filterText: ''
});


export const SET_SELECTED_ID = "SET_SELECTED_ID";
export const SET_FILTER_TEXT = "SET_FILTER_TEXT";
export const SET_ITEMS = "SET_ITEMS";

export const caseFilter:Reducer = (state = new Filter(), action:Action<any>) => {
  switch( action.type ) {
    case SET_SELECTED_ID:
      return state.set('selectedId', action.payload);
    case SET_FILTER_TEXT:
      return state.set('filterText', action.payload);
    case SET_ITEMS:
      return state.mergeIn(['items'], action.payload);
    default:
      return state;
  }
}

export function setItems(payload): Action<any> {
  return {
    type: SET_ITEMS,
    payload
  };
}

export function setSelectedId(payload: number): Action<number> {
  return {
    type: SET_SELECTED_ID,
    payload
  }
}

export function setFilterText(payload: string): Action<string> {
  return {
    type: SET_FILTER_TEXT,
    payload
  };
}

export const getFilter = (state) => {
  return state.filter.toJS();
}
export const getFilteredItems = (state) => {
  return state.filter.items.filter( item => {
    return -1 < item.subject.toLowerCase().indexOf(
      state.filter.filterText.toLowerCase()
    );
  }).toJS();
}