export const initialState = {
  guessesRemaining: 10,
  answer: {
    value: ['hangapp'],
    definition: 'A hangman game developed by Kyle Scheuerlein',
    wordType: 'noun'
  },
  progress: ['_______'],
  guessedLetters: [],
  isOver: false,
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
};
