import {defaultReducer, defaultEntityState} from './resource-reducer';
import {IEntityState} from './interfaces';
import {Reducer} from 'redux';
import * as Immutable from 'immutable';
import 'angular-mocks';

import {
  FIND_ONE, FINDING_ONE, FOUND_ONE,
  FIND, FINDING, FOUND,
  ADD, ADDING, ADDED, 
  DESTROY, DESTROYING, DESTROYED,
  PATCH, PATCHING, PATCHED,
  UPDATE, UPDATING, UPDATED,
  REFRESH, REFRESHING, REFRESHED,
  ERROR
} from './constants';

let type: string = 'CASE';
let reducer: Reducer;


describe('defaultReducer', () => {
  
  beforeEach(() => {
    reducer = defaultReducer(type);    
  })
        
  it ('returns a default entity state', () => {   
    expect(
       reducer(undefined, {})
     ).toEqual(new defaultEntityState());
  });  
  
  it ('should handle FINDING_CASE', () => {
    expect(
      Immutable.is(
        reducer(undefined, {
         type: `${FINDING}_${type}`,
        }),
        new defaultEntityState({ loadingMany: true })
    )).toBe(true);
  });
  
  it ('should handle FINDING_ONE_CASE', () => {
    expect(
      Immutable.is(
        reducer(undefined, {
         type: `${FINDING_ONE}_${type}`,
        }),
        new defaultEntityState({ loadingOne: true })
    )).toBe(true);
  });
  
  it ('should handle DESTROYING_CASE', () => {
    expect(
      Immutable.is(
        reducer(undefined, {
         type: `${DESTROYING}_${type}`,
        }),
        new defaultEntityState({ deleting: true })
    )).toBe(true);
  });
  
  it ('should handle PATCHING_CASE', () => {
    expect(
      Immutable.is(
        reducer(undefined, {
         type: `${PATCHING}_${type}`,
        }),
        new defaultEntityState({ patching: true })
    )).toBe(true);
  });
  
  it ('should handle ADDING_CASE', () => {
    expect(
      Immutable.is(
        reducer(undefined, {
         type: `${ADDING}_${type}`,
        }),
        new defaultEntityState({ adding: true })
    )).toBe(true);
  });
  
  it ('should handle FIND_CASE', () => {  
    let actual = reducer(undefined, {
      type: `${FOUND}_${type}`,
      payload: {
        result: ['/cases/1'],
        items: {
          '/cases/1': { _links: {self: {href: '/cases/1'}}, _embedded: {entries: [{}]} }
        },
        meta: null
      }        
    });
    
    let expected = new defaultEntityState({ 
      result: Immutable.List(['/cases/1']),
      items: Immutable.Map({
        '/cases/1': Immutable.fromJS({
          _links: {self: {href: '/cases/1'}}, _embedded: {entries: [{}]}
        })
      }),
      meta: null
    });
     
    expect(
      Immutable.is(
        actual,
        expected
    )).toBe(true);
        
  });
  
});