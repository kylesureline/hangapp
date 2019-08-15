import database from '../firebase/firebase';
import { hasLocalStorageSupport, hasWordsInLocalStorage, getWordFromLocalStorage } from '../utils/utils';
// import Word_List from '../wordBank/wordList.min.js';
import moment from 'moment';
import { startGetTheme } from './settings';

export const guessLetter = (letter) => ({
  type: 'GUESS_LETTER',
  letter
});

export const updateGuessedWord = (guessedWord) => ({
  type: 'UPDATE_GUESSED_WORD',
  guessedWord
});

export const wrongGuess = () => ({
  type: 'WRONG_GUESS'
});

export const setPlayerStats = (stats) => ({
  type: 'SET_PLAYER_STATS',
  stats
});

export const setPastGames = (pastGames) => ({
  type: 'SET_PAST_GAMES',
  pastGames
});

export const startSetPlayer = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const difficulty = getState().settings.difficulty;

    return database.ref(`players/${uid}`)
      .once('value')
      .then((snapshot) => {
        const pastGames = [];
        const stats = {
          wins: 0,
          losses: 0
        };

        if(!!snapshot.val()) {
          if(!!snapshot.val().stats) {
            stats.wins = snapshot.val().stats.wins;
            stats.losses = snapshot.val().stats.losses;
          }

          if(!!snapshot.val().pastGames) {
            for(let game in snapshot.val().pastGames) {
              pastGames.push(snapshot.val().pastGames[game]);
            }
            dispatch(chooseRandomWord());
          }
        } else {
          dispatch(chooseDefaultWord());
        }

        dispatch(startGetTheme());
        dispatch(setPlayerStats(stats));
        dispatch(setPastGames(pastGames));
      });

  };
};

export const chooseDefaultWord = () => ({
  type: 'CHOOSE_DEFAULT_WORD',
  answer: {
    word: 'hangapp',
    type: 'noun',
    def: 'A hangman game built as a React App by Kyle Scheuerlein'
  },
  guessedLetters: [],
  guessedWord: [],
  guessesRemaining: 10
});

export const chooseRandomWord = () => {
  let answer = {};
  if(hasLocalStorageSupport() && hasWordsInLocalStorage()) {
    answer = getWordFromLocalStorage();
  } else {
    answer = {
      word: Word_List.getRandomWord(),
      type: '',
      def: ''
    }
  }

  return {
    type: 'CHOOSE_RANDOM_WORD',
    answer,
    guessedLetters: [],
    guessedWord: [],
    guessesRemaining: 10
  };
};

export const addWord = (answer) => ({
  type: 'ADD_WORD',
  answer
});

export const startAddWord = (answerData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      word = '',
      type = '',
      def = '',
      won = true
    } = answerData;
    const playedAt = moment().valueOf();
    const answer = { word, type, def, won, playedAt };

    return database.ref(`players/${uid}/pastGames`).push(answer).then((ref) => {
      dispatch(addWord({
        id: ref.key,
        ...answer
      }));
    });
  };
};

export const addWin = () => ({
  type: 'ADD_WIN'
});

export const startAddWin = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const stats = getState().player.stats;

    return database.ref(`players/${uid}/stats`).update({...stats, wins: stats.wins + 1}).then((ref) => {
      dispatch(addWin());
    });
  };
};

export const addLoss = () => ({
  type: 'ADD_LOSS'
});

export const startAddLoss = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const stats = getState().player.stats;

    return database.ref(`players/${uid}/stats`).update({...stats, losses: stats.losses + 1}).then((ref) => {
      dispatch(addLoss());
    });
  };
};
