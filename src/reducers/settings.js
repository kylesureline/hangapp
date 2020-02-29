import { getFromLS } from '../utils';

const defaultDictionarySettings = {
  showWordType: true,
  showDefinition: false,
  skipWithoutDefinition: true,
  minLength: 4,
};

export const initialState = {
  mode: 'dictionary', // dictionary || categories
  lives: 10,
  dictionary: getFromLS('settings-dictionary') || defaultDictionarySettings,
  categories: []
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CHANGE_MODE':
      return {
        ...state,
        mode: action.mode
      };
    case 'CHANGE_DICTIONARY_SETTINGS':
      return {
        ...state,
        dictionary: {
          ...state.dictionary,
          ...action.settings
        }
      };
    default:
      return state
  }
};
