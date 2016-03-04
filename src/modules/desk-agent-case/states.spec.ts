//import createStore from '../../../node_modules/redux/dist';
import {createStore} from 'redux';
import {assign} from 'lodash';
import * as state from './states';

let store = null;
let defaultState = {
  deskAgentCase: {
    cases: [
      {
        id: 1,
        subject: 'test'
      }
    ]
  }
};

describe('case states', => {
  beforeEach( => {
    store = createStore( (state = defaultState, action) => {
      return assign({}, state);
    });
  })
  
  it('should set cases', function() {
    //console.log(state.setCases)
    //expect(state.setCases([])).toBe({type: SET_CASES, payload: []});
    console.log('******', store.getState());
    expect(true).toBe(true);
    //expect(state.getCases(store.getState())).toBe(true);
  });
  
});