import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  guessLetter,
  updateGuessedWord,
  wrongGuess,
  setPlayerStats,
  setPastGames,
  startSetPlayer,
  chooseDefaultWord,
  chooseRandomWord,
  addWord,
  startAddWord,
  setGuessesRemaining,
  addWin,
  // startAddWin,
  addLoss,
  // startAddLoss
  } from '../../actions/player';
import database from '../../firebase/firebase';
import { player } from '../fixtures/player.js';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const pastGame = {};
  player.pastGames.forEach(({ id, word, type, def, playedAt, won }) => {
    pastGame[id] = { word, type, def, playedAt, won };
  });
  database.ref(`players/${uid}/pastGames`).set(pastGame).then(() => {
    database.ref(`players/${uid}/stats`).set(player.stats).then(() => done());
  });
});

test('should setup guessLetter action object', () => {
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const letter = letters[Math.floor(Math.random() * letters.length)];
  const action = guessLetter(letter);
  expect(action).toEqual({
    type: 'GUESS_LETTER',
    letter
  });
});

test('should setup updateGuessedWord action object', () => {
  const wordArray = ['h'];
  const action = updateGuessedWord(wordArray);
  expect(action).toEqual({
    type: 'UPDATE_GUESSED_WORD',
    wordArray
  });
});

test('should setup wrongGuess action object', () => {
  const action = wrongGuess();
  expect(action).toEqual({
    type: 'WRONG_GUESS'
  });
});

test('should setup setPlayerStats action object', () => {
  const stats = player.stats;
  const action = setPlayerStats(stats);
  expect(action).toEqual({
    type: 'SET_PLAYER_STATS',
    stats
  });
});

test('should setup setPastGames action object', () => {
  const pastGames = player.pastGames;
  const action = setPastGames(pastGames);
  expect(action).toEqual({
    type: 'SET_PAST_GAMES',
    pastGames
  });
});

// test('should fetch player from firebase', (done) => {
// startSetPlayer()
// });

test('should setup chooseDefaultWord action object', () => {
  const action = chooseDefaultWord();
  expect(action).toEqual({
    type: 'CHOOSE_DEFAULT_WORD',
    answer: {
      word: 'hangapp',
      type: 'noun',
      def: 'A hangman game built as a React App by Kyle Scheuerlein'
    },
    guessedLetters: [],
    guessedWord: []
  });
});

test('should setup chooseRandomWord action object', () => {
  const action = chooseRandomWord();
  expect(action.type).toBe('CHOOSE_RANDOM_WORD');
  expect(action.answer.word).toMatch(/[a-z]/g);
  expect(action.answer.type).toBe('');
  expect(action.answer.def).toBe('');
  expect(action.guessedLetters).toEqual([]);
  expect(action.guessedWord).toEqual([]);
});

test('should setup addWord action object', () => {
  const answer = player.answer;
  const action = addWord(answer);
  expect(action).toEqual({
    type: 'ADD_WORD',
    answer
  });
});

test('should add game to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
  const answer = {
    word: 'jazz',
    type: 'noun',
    def: 'a type of music',
    won: true,
    playedAt: 0
  };

  store.dispatch(startAddWord(answer)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_WORD',
      answer: {
        id: expect.any(String),
        ...answer
      }
    });

    return database.ref(`players/${uid}/pastGames/${actions[0].answer.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(answer);
    done();
  });
});

test('should setGuessesRemaining to 10', () => {
  const action = setGuessesRemaining();
  expect(action).toEqual({
    type: 'SET_GUESSES_REMAINING',
    guessesRemaining: 10
  });
});

test('should setup addWin action object', () => {
  const action = addWin();
  expect(action).toEqual({
    type: 'ADD_WIN'
  });
});

// test('should add win to database', (done) => {
//   const store = createMockStore(defaultAuthState);
//   const stats = player.stats;
//
//   store.dispatch(startAddWin()).then(() => {
//     const actions = store.getActions();
//     expect(actions[0]).toEqual({
//       type: 'ADD_WIN'
//     });
//
//     return database.ref(`players/${uid}/stats`).once('value');
//   }).then((snapshot) => {
//     expect(snapshot.val()).toEqual({
//       ...stats,
//       wins: stats.wins + 1
//     });
//     done();
//   });
// });

test('should setup addLoss action object', () => {
  const action = addLoss();
  expect(action).toEqual({
    type: 'ADD_LOSS'
  });
});

// startAddLoss
