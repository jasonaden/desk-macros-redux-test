import {createSelector} from 'reselect';
import {Reducer, combineReducers} from 'redux';
import {Action} from 'flux-standard-action';
import * as Immutable from 'immutable';

import {ICase, getCases} from '../desk/resources/case';

export const Filters = Immutable.Record({
  activeFilterId: -1,
  filters: Immutable.Map()
});

export const Filter = Immutable.Record({
  filterId: -1,
  type: 'case',
  sortDirection: 'desc',
  sortField: 'updated_at',
  routingEnabled: false,
  active: true,
  group: null,
  user: null,
  items: Immutable.List(),
  actions: Immutable.List(),
  selectedId: -1,
  filterText: ''
});


export const SET_SELECTED_ID = "SET_SELECTED_ID";
export const SET_FILTER_TEXT = "SET_FILTER_TEXT";
export const SET_ITEMS = "SET_ITEMS";
export const SET_FILTER = 'SET_FILTER';
export const SET_ACTIVE_FILTER_ID = 'SET_ACTIVE_FILTER_ID';

export const filterStore:Reducer = (state = new Filters(), action:Action<any>) => {
  switch( action.type ) {
    case SET_FILTER:
      return state.mergeIn(['filters', action.payload.filterId], action.payload);
    case SET_ACTIVE_FILTER_ID:
      return state.set('activeFilterId', action.payload);
    case SET_SELECTED_ID:
      return state.setIn(['filters', state.activeFilterId, 'selectedId'], action.payload);
    case SET_FILTER_TEXT:
      return state.setIn(['filters', state.activeFilterId, 'filterText'], action.payload);
    case SET_ITEMS:
      return state.mergeIn(['filters', state.activeFilterId, 'items'], action.payload);
    default:
      return state;
  }
}

export function setFilter(payload): Action<any> {
  return {
    type: SET_FILTER,
    payload
  };
}

export function setActiveFilterId(payload): Action<any> {
  return {
    type: SET_ACTIVE_FILTER_ID,
    payload
  };
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

export const getActiveFilter = (state) => {
  if (state.filterStore.activeFilterId == -1) { return null; }
  return state.filterStore.filters.get(state.filterStore.activeFilterId);
}
export const getFilteredItems = createSelector(
  getActiveFilter,
  (activeFilter) => {
    return activeFilter.get('items');
    /*.filter( item => {
      return -1 < item.get('subject').toLowerCase().indexOf(
        activeFilter.get('filterText').toLowerCase()
      );
    });*/
  });