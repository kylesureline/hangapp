import React from 'react';
import { connect } from 'react-redux';

export const LetterGridItem = (props) => (
  <button onClick={props.handleGuess} disabled={props.guessedLetters.indexOf(props.letter) !== -1}>{props.letter}</button>
);

const mapStateToProps = (state) => ({
  guessedLetters: state.player.guessedLetters
});

export default connect(mapStateToProps)(LetterGridItem);
