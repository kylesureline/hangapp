import React from 'react';
import { shallow } from 'enzyme';
import { LetterGrid } from '../../components/LetterGrid.jsx';
import { player } from '../fixtures/player';
let guessLetter,
    updateGuessedWord,
    wrongGuess,
    startAddWord,
    startAddWin,
    startAddLoss,
    answer,
    guessedLetters,
    guessesRemaining,
    guessedWord;

const playerWithNoGuesses = {
  ...player,
  guessedLetters: [],
  guessesRemaining: 10,
  guessedWord: []
};

const playerWithOneWrongGuess = {
  ...player,
  guessedLetters: ['z'],
  guessesRemaining: 9,
  guessedWord: []
}

beforeEach(() => {
  guessLetter = jest.fn();
  updateGuessedWord = jest.fn();
  wrongGuess = jest.fn();
  startAddWord = jest.fn();
  startAddWin = jest.fn();
  startAddLoss = jest.fn();
});

test('should render LetterGrid correctly', () => {
  const wrapper = shallow(
    <LetterGrid
      guessLetter={guessLetter}
      updateGuessedWord={updateGuessedWord}
      wrongGuess={wrongGuess}
      startAddWord={startAddWord}
      startAddWin={startAddWin}
      startAddLoss={startAddLoss}
      answer={playerWithNoGuesses.answer}
      guessedLetters={playerWithNoGuesses.guessedLetters}
      guessesRemaining={playerWithNoGuesses.guessesRemaining}
      guessedWord={playerWithNoGuesses.guessedWord}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
