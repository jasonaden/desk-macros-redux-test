
import {normalize, arrayOf} from 'normalizr';
import {action} from '../actions/action';
import {FIND, ADD} from '../resource';

export function splitSchema (schema, name: string, data) {
  return (dispatch, store) => {
    let normalized = normalize(data.entries, arrayOf(schema));
    // This is for testing only. If no results are returned, Normalizr will 
    // return result: [ undefined ] and entities[entity] = {undefined:{}}.
    if (normalized.result[0] === undefined) {
      normalized.result.length = 0;
      normalized.entities[name.toLowerCase()] = {};
    }
    // Dispatch event for the main data that was gathered on this request.
    // This includes metadata about the collection.
    dispatch(action(FIND, name.toUpperCase(), {
      result: normalized.result,
      items: normalized.entities[name.toLowerCase()],
      meta: {
        count: data.total_entries,
        page: data.page,
        links: data._links
      }
    }));
    
    // Iterate over other objects that were returned (normalized) and 
    // dispatch add actions for them to get them into the store.
    for (let x in normalized.entities) {
      // Exclude main entity
      if (x.toUpperCase() !== name.toUpperCase()) {
        // Iterate over each object passed back and dispatch ADD action
        for (let y in normalized.entities[x]) {
          dispatch(action(ADD, x.toUpperCase(), normalized.entities[x][y]));
        }
      }
    }
  }
}