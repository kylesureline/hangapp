export const initialState = {
  guessesRemaining: 10,
  answer: {
    word: ['hangapp'],
    def: 'A hangman game developed by Kyle Scheuerlein',
    wordType: 'noun'
  },
  progress: ['_______'],
  guessedLetters: [],
  isOver: false,
};

// game over
// export const initialState = {
//   guessesRemaining: 0,
//   answer: {
//     word: ['hangapp'],
//     def: 'A hangman game developed by Kyle Scheuerlein',
//     wordType: 'noun'
//   },
//   progress: ['_______'],
//   guessedLetters: ['z', 'x', 'y', 'w', 't', 'b', 'r', 'o', 'i', 'v'],
//   isOver: true,
// }

const updateProgress = (answer, progress, guessedLetter) => progress.map((word, wordIndex) => {
  return word.split('').map((letter, letterIndex) => {
    if(guessedLetter === answer[wordIndex].charAt(letterIndex)) {
      return guessedLetter;
    }
    return letter;
  }).join('');
});

export const reducer = (state = initialState, { type, answer, letter }) => {
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
    case 'GUESS_LETTER':
      const newProgress = updateProgress(state.answer.word, state.progress, letter);
      const newGuessesRemaining = state.answer.word.join(' ').includes(letter) ? state.guessesRemaining : state.guessesRemaining >= 1 ? state.guessesRemaining - 1 : 0;
      return {
        ...state,
        guessesRemaining: newGuessesRemaining,
        progress: newProgress,
        isOver: newProgress.join(' ') === state.answer.word.join(' ') || newGuessesRemaining === 0,
      };
    default:
      return state;
  }
};
