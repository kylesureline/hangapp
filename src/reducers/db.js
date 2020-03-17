import { getFromLS } from '../utils';
import wordBank from '../db/wordBank';

export const initialState = {
  dictionary: {
    withoutDef: wordBank,
    withDef: getFromLS('db-dictionary-withDef') || [],
  },
  categories: {
    recipes: getFromLS('db-categories-recipes') || [],
    dogs: getFromLS('db-categories-dogs') || [],
    cats: getFromLS('db-categories-cats') || [],
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
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.category]: [...state.categories[action.category], action.answer]
        }
      };
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.category]: action.answers
        }
      }
    default:
      return state;
  }
};
