import { getFromLS } from "../utils";

const defaultSettings = {
  mode: "dictionary", // 'dictionary' || 'categories'
  dictionary: {
    showWordType: true,
    showDefinition: false,
    skipWithoutDefinition: true,
    minLength: 4
  },
  categories: ["recipes"]
};

export const initialState = getFromLS("settings") || defaultSettings;

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_MODE":
      return {
        ...state,
        mode: action.mode
      };
    case "CHANGE_DICTIONARY_SETTINGS":
      return {
        ...state,
        dictionary: {
          ...state.dictionary,
          ...action.settings
        }
      };
    case "CHANGE_CATEGORIES":
      // remove if it exists
      if (state.categories.includes(action.category)) {
        // require at least one category active at a time
        if (state.categories.length > 1) {
          return {
            ...state,
            categories: [...state.categories].filter(
              category => category !== action.category
            )
          };
        } else {
          return state;
        }
      } else {
        return {
          ...state,
          categories: [...state.categories, action.category]
        };
      }
    default:
      return state;
  }
};
