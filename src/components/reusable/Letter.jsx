import React from 'react';

export const Letter = ({ letter, onClick, guessedLetters }) => (
  <button
    className="letters__item"
    onClick={() => onClick(letter)}
    disabled={guessedLetters.includes(letter)}
  >{letter}</button>
);
