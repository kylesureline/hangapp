import { getCache } from '../utils';

export const initialState = {
  doneCompiling: false,
  words: {
    withoutDef: [],
    withDef: getCache('db') || [],
  },
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_WORDS_WITHOUT_DEF':
      return {
        ...state,
        doneCompiling: false,
        words: {
          ...state.words,
          withoutDef: [...state.words.withoutDef, ...action.chunk]
        },
      };
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
    case 'DONE_COMPILING':
      return {
        ...state,
        doneCompiling: true
      };
    default:
      return state;
  }
};
