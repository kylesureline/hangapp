import { initialState, reducer, firstGame } from './game';
import {
  NEW_GAME,
  GUESS_LETTER,
  SAVE_GAME,
  END_GAME,
} from './actions';

describe('tests the settings reducer and actions', () => {
  it('starts a new game', () => {
    const answer = {
      words: ['cringe'],
      wordType: 'noun',
      def: 'a cringing act; specifically : a servile bow'
    };

    const stateWithNewGame = reducer(initialState, NEW_GAME(answer));
    expect(stateWithNewGame).toEqual({
      ...firstGame,
      answer,
      progress: ['______']
    })
  });

  it('guesses a letter', () => {
    const stateAfterWrongGuess = reducer(initialState, GUESS_LETTER('z'));

    expect(stateAfterWrongGuess.guessesRemaining).toBe(9);
    expect(stateAfterWrongGuess.guessedLetters).toEqual(['z']);
    expect(stateAfterWrongGuess.progress).toEqual(['_______']);

    const stateAfterRightGuess = reducer(stateAfterWrongGuess, GUESS_LETTER('a'));

    expect(stateAfterRightGuess.guessesRemaining).toBe(9);
    expect(stateAfterRightGuess.guessedLetters).toEqual(['z','a']);
    expect(stateAfterRightGuess.progress).toEqual(['_a__a__']);
  });

  // it('saves the game', () => {
  //
  // })

  it('ends the game', () => {
    expect(reducer(initialState, END_GAME()).isOver).toBeTruthy();
  })
});
