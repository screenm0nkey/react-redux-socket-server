import {expect} from 'chai';
import {List, Map} from 'immutable';

describe('immutability', () => {

  describe('a tree', () => {

    function addMovie(currentState, movie) {
      return currentState.update('movies', movies => movies.push(movie));
    }

    it('is immutable', () => {
      let state = Map({
        nick : 11,
        movies: List.of('Trainspotting', '28 Days Later')
      });
      let nextState = addMovie(state, 'Sunshine');

      expect(nextState).to.equal(Map({
        nick : 11,
        movies: List.of(
          'Trainspotting',
          '28 Days Later',
          'Sunshine'
        )
      }));
      expect(state).to.equal(Map({
        nick : 11,
        movies: List.of(
          'Trainspotting',
          '28 Days Later'
        )
      }));
    });

  });

});