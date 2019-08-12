const defaultGameState = {
  answer: {
    word: '',
    type: '',
    def: ''
  },
  guessedLetters: [],
  guessedWord: [],
  guessesRemaining: 0,
  stats: {
    wins: 0,
    losses: 0
  }
};

export default (state = defaultGameState, action) => {
  switch(action.type) {
    case 'GUESS_LETTER':
      return {
        ...state,
        guessedLetters: [...state.guessedLetters, action.letter]
      };
    case 'UPDATE_GUESSED_WORD':
      return {
        ...state
      };
    case 'WRONG_GUESS':
      return {
        ...state,
        guessesRemaining: state.guessesRemaining -= 1
      };
    case 'SET_PLAYER_STATS':
      return {
        ...state,
        stats: action.stats
      };
    case 'SET_PAST_GAMES':
      return {
        ...state,
        pastGames: action.pastGames
      };
    case 'SET_GUESSES_REMAINING':
      return {
        ...state,
        guessesRemaining: action.guessesRemaining
      }
    case 'CHOOSE_DEFAULT_WORD':
      return {
        ...state,
        answer: {
          word: 'hangapp',
          type: 'noun',
          def: 'A hangman game built as a React PWA by Kyle Scheuerlein'
        }
      };
    case 'CHOOSE_RANDOM_WORD':
      return {
        ...state,
        answer: action.answer
      }
    case 'ADD_WORD':
      return {
        ...state,
        pastGames: [
          ...state.pastGames,
          action.answer
        ]
      }
    case 'ADD_WIN':
      return {
        ...state,
        stats: {
          ...state.stats,
          wins: state.stats.wins + 1
        }
      }
    case 'ADD_LOSS':
      return {
        ...state,
        stats: {
          ...state.stats,
          losses: state.stats.losses + 1
        }
      }
    default:
      return state;
  }
};
