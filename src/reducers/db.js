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
    case 'ADD_RECIPE':
      return {
        ...state,
        categories: {
          ...state.categories,
          recipes: [...state.categories.recipes, action.recipe]
        }
      };
    case 'UPDATE_RECIPES':
      return {
        ...state,
        categories: {
          ...state.categories,
          recipes: action.recipes
        }
      };
    case 'ADD_DOG':
      return {
        ...state,
        categories: {
          ...state.categories,
          dogs: [...state.categories.dogs, action.dog]
        }
      };
    case 'UPDATE_DOGS':
      return {
        ...state,
        categories: {
          ...state.categories,
          dogs: action.dogs
        }
      };
    default:
      return state;
  }
};
