export const initialState = {
  mode: 'word', // word | phrase | category
  category: 'places',
  minWordLength: 4,
  lives: 10,
  skipWordsWithoutDefinition: true,
  showDefinition: false,
  showWordType: true,
  showCategory: true,
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state
  }
};
