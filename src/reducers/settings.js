export const initialState = {
  mode: 'word', // word | phrase | category
  lives: 10,
  word: {
    showWordType: true,
    showDefinition: false,
    skipWithoutDefinition: true,
    minLength: 4,
  },
  phrase: {

  },
  category: {

  }
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state
  }
};
