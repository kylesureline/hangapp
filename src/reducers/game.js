export const initialState = {
  guessesRemaining: 10,
  answer: {
    value: ['hangapp'],
    definition: 'A hangman game developed by Kyle Scheuerlein',
    wordType: 'Noun'
  },
  progress: ['_______'],
  guessedLetters: [],
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
};
