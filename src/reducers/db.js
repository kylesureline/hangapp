import { getFromLS } from '../utils';
import wordBank from '../db/wordBank';

export const initialState = {
  dictionary: {
    withoutDef: wordBank,
    withDef: getFromLS('db-dictionary-withDef') || [],
  },
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_WORD_WITH_DEF':
      return {
        ...state,
        dictionary: {
          ...state.dictionary,
          withDef: [...state.dictionary.withDef, action.word]
        }
      };
    case 'UPDATE_WORDS_WITH_DEF':
      return {
        ...state,
        dictionary: {
          ...state.dictionary,
          withDef: action.withDef
        }
      };
    default:
      return state;
  }
};
