import {setEntries, next, vote, reset, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ENTRIES':
      state = setEntries(state, action.entries);
      console.log(1, action.type, state.toJS());
      return state;
    case 'NEXT':
      state = next(state.remove('reset'));
      console.log(2, action.type, state.toJS());
      return state;
    case 'VOTE':
      state = state.remove('reset').update('vote', voteState => vote(voteState, action.entry));
      console.log(3, action.type, state.toJS());
      return state;
    case 'RESET':
      state = reset(state, action.entries);
      console.log(4, action.type, state.toJS());
      return state;
  }
  return state;
}