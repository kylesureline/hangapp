import { initialState, reducer } from './db';
import {
  ADD_WORD_WITH_DEF,
  UPDATE_WORDS_WITH_DEF,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
} from './actions';

describe('tests the settings reducer and actions', () => {
  describe('works with definitions', () => {
    const answer = {
      words: ['ruana'],
      wordType: 'noun',
      def: 'a woolen covering resembling a poncho'
    };

    const stateWithNewWord = reducer(initialState, ADD_WORD_WITH_DEF(answer));
    const stateAfter = reducer(stateWithNewWord, UPDATE_WORDS_WITH_DEF([]));

    it('adds a word', () => {
      expect(stateWithNewWord.dictionary.withDef).toEqual([answer]);
    });

    it('removes a word', () => {
      expect(stateAfter.dictionary.withDef).toEqual([]);
    })
  });

  describe('works with categories', () => {
    const cat = {
      words: ['american', 'wirehair'],
      temperament: 'Affectionate, Curious, Gentle, Intelligent, Interactive, Lively, Loyal, Playful, Sensible, Social',
      description: 'The American Wirehair tends to be a calm and tolerant cat who takes life as it comes. His favorite hobby is bird-watching from a sunny windowsill, and his hunting ability will stand you in good stead if insects enter the house.',
      category: 'cat'
    };

    it('adds/removes cats', () => {
      const addedState = reducer(initialState, ADD_CATEGORY('cats', cat));
      const removed = reducer(addedState, UPDATE_CATEGORY('cats', []));
      expect(addedState.categories.cats).toEqual([cat]);
      expect(removed.categories.cats).toEqual([]);
    })
  });
});
