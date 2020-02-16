import React from 'react';
import { Letter } from './Letter';

export const Letters = () => {
  const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const clickHandler = letter => {
    console.log(letter);
  };

  return (
    <div className="input">
      {abc.map(letter => <Letter key={letter} letter={letter} onClick={clickHandler} />)}
    </div>
  )
};
