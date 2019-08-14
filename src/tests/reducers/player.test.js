import playerReducer from '../../reducers/player';
import { player } from '../fixtures/player';
import Word_List from '../../wordBank/wordList.min.js';

const middleOfGameState = {
  answer: {
    word: 'jazz',
    type: 'noun',
    def: 'a type of music'
  },
  guessedLetters: ['x'],
  guessedWord: [],
  guessesRemaining: 9,
  stats: {
    wins: 2,
    losses: 1
  },
  pastGames: []
};

const beginningOfGameState = {
  answer: {
    word: 'jazz',
    type: 'noun',
    def: 'a type of music'
  },
  guessedLetters: [],
  guessedWord: [],
  guessesRemaining: 10,
  stats: {
    wins: 2,
    losses: 1
  },
  pastGames: []
};


test('should add guessedLetter to array at beginning of game', () => {
  const action = {
    type: 'GUESS_LETTER',
    letter: 'x'
  };
  const state = playerReducer(beginningOfGameState, action);
  expect(state.guessedLetters).toEqual(['x']);
});

test('should add guessedLetter to array in the middle of game', () => {
  const action = {
    type: 'GUESS_LETTER',
    letter: 'w'
  };
  const state = playerReducer(middleOfGameState, action);
  expect(state.guessedLetters).toEqual(['x', 'w']);
});

test('should update guessedWord', () => {
  const guessedWord = ['j'];
  const action = {
    type: 'UPDATE_GUESSED_WORD',
    guessedWord
  };
  const state = playerReducer(beginningOfGameState, action);
  expect(state.guessedWord).toEqual(guessedWord);
});

test('should subtract 1 from guessesRemaining', () => {
  const action = {
    type: 'WRONG_GUESS'
  };
  const state = playerReducer(beginningOfGameState, action);
  expect(state.guessesRemaining).toBe(9);
});

test('should set player stats', () => {
  const action = {
    type: 'SET_PLAYER_STATS',
    stats: beginningOfGameState.stats
  };
  const state = playerReducer({}, action);
  expect(state.stats).toEqual(beginningOfGameState.stats);
});

test('should set pastGames', () => {
  const action = {
    type: 'SET_PAST_GAMES',
    pastGames: player.pastGames
  };
  const state = playerReducer({}, action);
  expect(state.pastGames).toEqual(player.pastGames);
});

test('should choose default word', () => {
  const defaultWord = {
    answer: {
      word: 'hangapp',
      type: 'noun',
      def: 'A hangman game built as a React App by Kyle Scheuerlein'
    },
    guessedLetters: [],
    guessedWord: [],
    guessesRemaining: 10
  };
  const action = {
    type: 'CHOOSE_DEFAULT_WORD',
    ...defaultWord
  };
  const state = playerReducer({}, action);
  expect(state.answer).toEqual(defaultWord.answer);
  expect(state.guessedLetters).toEqual(defaultWord.guessedLetters);
  expect(state.guessedWord).toEqual(defaultWord.guessedWord);
  expect(state.guessesRemaining).toBe(defaultWord.guessesRemaining);
});

test('should choose random word', () => {
  const randomWord = {
    answer: {
      word: Word_List.getRandomWord(),
      type: '',
      def: ''
    },
    guessedLetters: [],
    guessedWord: [],
    guessesRemaining: 10
  };
  const action = {
    type: 'CHOOSE_RANDOM_WORD',
    ...randomWord
  };
  const state = playerReducer({}, action);
  expect(state.answer).toEqual(randomWord.answer);
  expect(state.guessedLetters).toEqual(randomWord.guessedLetters);
  expect(state.guessedWord).toEqual(randomWord.guessedWord);
  expect(state.guessesRemaining).toBe(randomWord.guessesRemaining);
});

test('should add word to pastGames', () => {
  const answer = {
    id: 'abc123',
    word: 'jazz',
    type: 'noun',
    def: 'a type of music',
    won: true,
    playedAt: 1234567890
  };
  const action = {
    type: 'ADD_WORD',
    answer
  };
  const state = playerReducer(beginningOfGameState, action);
  expect(state.pastGames).toEqual([answer]);
});

test('should add win, with losses unchanged', () => {
  const action = {
    type: 'ADD_WIN'
  };
  const state = playerReducer(beginningOfGameState, action);
  expect(state.stats.wins).toBe(beginningOfGameState.stats.wins + 1);
  expect(state.stats.losses).toBe(beginningOfGameState.stats.losses);
});

test('should add loss, with wins unchanged', () => {
  const action = {
    type: 'ADD_LOSS'
  };
  const state = playerReducer(beginningOfGameState, action);
  expect(state.stats.losses).toBe(beginningOfGameState.stats.losses + 1);
  expect(state.stats.wins).toBe(beginningOfGameState.stats.wins);
});
