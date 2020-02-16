import React from 'react';

export const Word = ({ word }) => (
  word.split('').map((letter, index) => <span key={index}>{letter}</span>)
);
