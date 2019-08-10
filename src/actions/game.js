export const initializeGame = (word, guessesRemaining) => ({
  type: 'INIT_GAME',
  answer: word,
  guessesRemaining
});

export const guessLetter = (letter) => ({
  type: 'GUESS_LETTER',
  letter
});

export const updateGuessedWord = (wordArray) => ({
  type: 'UPDATE_GUESSED_WORD',
  wordArray
});

export const wrongGuess = () => ({
  type: 'WRONG_GUESS'
});
