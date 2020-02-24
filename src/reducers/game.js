import { savePastGame, saveCurrentGame, getCurrentGame } from '../utils';

const firstGame = {
  guessesRemaining: 10,
  answer: {
    words: ['hangapp'],
    def: 'A hangman game developed by Kyle Scheuerlein',
    wordType: 'noun'
  },
  progress: ['_______'],
  guessedLetters: [],
  isOver: false,
  category: '',
};

export const initialState = getCurrentGame() || firstGame;

// game over
// export const initialState = {
//   guessesRemaining: 0,
//   answer: {
//     words: ['hangapp'],
//     def: 'A hangman game developed by Kyle Scheuerlein',
//     wordType: 'noun'
//   },
//   progress: ['_______'],
//   guessedLetters: ['z', 'x', 'y', 'w', 't', 'b', 'r', 'o', 'i', 'v'],
//   isOver: true,
//   category: '',
// }

const updateProgress = (answer, progress, guessedLetter) => progress.map((word, wordIndex) => {
  return word.split('').map((letter, letterIndex) => {
    if(guessedLetter === answer[wordIndex].charAt(letterIndex)) {
      return guessedLetter;
    }
    return letter;
  }).join('');
});

export const reducer = (state = initialState, { type, answer, letter, mode, categories, won }) => {
  switch(type) {
    case 'NEW_GAME':
      return {
        ...state,
        guessesRemaining: 10,
        answer,
        progress: [...Array(answer.words.length)].map((word, index) => (
          [...Array(answer.words[index].length)].map((_, i) => '_').join('')
        )),
        guessedLetters: [],
        isOver: false,
      };
    case 'GUESS_LETTER':
      const progress = updateProgress(state.answer.words, state.progress, letter);
      const guessesRemaining = state.answer.words.join(' ').includes(letter) ? state.guessesRemaining : state.guessesRemaining >= 1 ? state.guessesRemaining - 1 : 0;
      // generate the new state
      const stateAfterGuessing = {
        ...state,
        guessesRemaining,
        progress,
        guessedLetters: [...state.guessedLetters, letter],
      };

      saveCurrentGame(stateAfterGuessing);

      return stateAfterGuessing;
    case 'SAVE_GAME':
      const withoutIsOverProp = {...state}
      delete withoutIsOverProp.isOver;
      savePastGame({
        ...withoutIsOverProp,
        timestamp: Date.now(),
        won,
        mode,
        categories
      });
      // should fall through to end it as well vvvvvv
    case 'END_GAME':
      return {
        ...state,
        isOver: true,
      };
    default:
      return state;
  }
};
