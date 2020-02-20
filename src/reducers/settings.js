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
    default:
      return state
  }
};
