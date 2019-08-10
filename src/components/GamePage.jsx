import React from 'react';
import { connect } from 'react-redux';
import HangmanSVG from './HangmanSVG.jsx';
import LetterGrid from './LetterGrid.jsx';
import Answer from './Answer.jsx';
import { initializeGame } from '../actions/game';

export const GamePage = (props) => {
  const dummyWord = {
    word: 'hangapp',
    wordType: 'noun',
    def: 'A Hangman game built by Kyle Scheuerlein'
  };
  props.initializeGame(dummyWord, 10);
  return (
    <div>
      <HangmanSVG />
      <Answer/>
      <LetterGrid />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  initializeGame: (word, guessesRemaining) => dispatch(initializeGame(word, guessesRemaining))
});

export default connect(undefined, mapDispatchToProps)(GamePage);
