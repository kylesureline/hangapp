const defaultGameState = {
  answer: {
    word: '',
    wordType: '',
    def: ''
  },
  guessedLetters: [],
  guessedWord: [],
  guessesRemaining: 0
};

export default (state = defaultGameState, action) => {
  switch(action.type) {
    case 'INIT_GAME':
      return {
        ...state,
        answer: action.answer,
        guessedLetters: [],
        guessedWord: action.answer.word.split('').map((letter) => ' '),
        guessesRemaining: action.guessesRemaining
      };
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
      }
    case 'SET_PAST_GAMES':
      return {
        ...state,
        pastGames: action.pastGames
      }
    default:
      return state;
  }
};
