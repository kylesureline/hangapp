import { getFromLS } from '../utils';

const defaultWordsSettings = {
  showWordType: true,
  showDefinition: false,
  skipWithoutDefinition: true,
  minLength: 4,
};

export const initialState = {
  mode: 'words', // words || categories
  lives: 10,
  words: getFromLS('settings-words') || defaultWordsSettings,
  categories: {}
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CHANGE_MODE':
      return {
        ...state,
        mode: action.mode
      };
    case 'CHANGE_WORDS_SETTINGS':
      // console.log(state);
      // console.log(action.settings);
      // return state;
      return {
        ...state,
        words: {
          ...state.words,
          ...action.settings
        }
      };
    default:
      return state
  }
};
