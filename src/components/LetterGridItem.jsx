import React from 'react';

export const LetterGridItem = (props) => (
  <button onClick={props.handleGuess}>{props.letter}</button>
);

export default LetterGridItem;
