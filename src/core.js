import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
  // keep initial initialEntries for resetting
  const list = List(entries);
  return state.set('entries', list).set('initialEntries', list);
}

function getWinners(vote) {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if (aVotes > bVotes)  return [a];
  else if (aVotes < bVotes)  return [b];
  else                       return [a, b];
}

export function next(state) {
  const entries = state.get('entries').concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
    return state.remove('vote')
      .remove('entries')
      .set('winner', entries.first());
  } else {
    return state.merge({
      vote: Map({pair: entries.take(2)}),
      entries: entries.skip(2)
    });
  }
}


export function reset(state, entries) {
  entries = entries || state.get('initialEntries');
  state = setEntries(INITIAL_STATE, entries);
  state = next(state).set('reset', true);
  return state;
}


export function vote(state, entry) {
  return state.updateIn(['tally', entry],
    0,
    tally => tally + 1
  );
}