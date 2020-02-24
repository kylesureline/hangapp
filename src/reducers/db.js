import { getFromLS } from '../utils';
import wordBank from '../db/wordBank';

export const initialState = {
  words: {
    withoutDef: wordBank,
    withDef: getFromLS('db-words-withDef') || [],
  },
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_WORD_WITH_DEF':
      return {
        ...state,
        words: {
          ...state.words,
          withDef: [...state.words.withDef, action.word]
        }
      };
    case 'UPDATE_WORDS_WITH_DEF':
      return {
        ...state,
        words: {
          ...state.words,
          withDef: action.withDef
        }
      };
    default:
      return state;
  }
};
