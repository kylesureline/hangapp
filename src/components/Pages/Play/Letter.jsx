import React from 'react';

export const Letter = ({ letter, onClick }) => (
  <button onClick={() => onClick(letter)}>{letter}</button>
);
