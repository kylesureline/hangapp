export const initialState = {
  guessesRemaining: 10,
  // guessesRemaining: 0,
  answer: {
    word: ['hangapp'],
    def: 'A hangman game developed by Kyle Scheuerlein',
    wordType: 'noun'
  },
  progress: ['_______'],
  guessedLetters: [],
  // guessedLetters: ['z', 'x', 'y', 'w', 't', 'b', 'r', 'o', 'i', 'v'],
  isOver: false,
};

export const reducer = (state = initialState, { type, answer }) => {
  switch(type) {
    case 'NEW_GAME':
      return {
        ...state,
        guessesRemaining: 10,
        answer,
        progress: [...Array(answer.word.length)].map((word, index) => (
          [...Array(answer.word[index].length)].map((_, i) => '_').join('')
        )),
        guessedLetters: [],
        isOver: false,
      };
    default:
      return state;
  }
};
