export const initialState = {
  mode: 'words', // words | phrases | categories
  lives: 10,
  words: {
    showWordType: true,
    showDefinition: false,
    skipWithoutDefinition: true,
    minLength: 4,
  },
  phrases: {

  },
  categories: {

  }
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
