import React from 'react';

export const Letter = ({ letter, onClick }) => (
  <button className="letters__item" onClick={() => onClick(letter)}>{letter}</button>
);
