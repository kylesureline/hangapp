import database from '../firebase/firebase';

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

export const setPlayer = (player) => ({
  type: 'SET_PLAYER',
  player
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

    return database.ref(`players/${uid}`)
      .once('value')
      .then((snapshot) => {
        const pastGames = [];

        for(let game in snapshot.val().pastGames) {
          pastGames.push(snapshot.val().pastGames[game]);
        }

        const stats = snapshot.val().stats;

        dispatch(setPlayerStats(stats));
        dispatch(setPastGames(pastGames));
      });

  };
};
