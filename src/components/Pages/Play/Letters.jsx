import React from 'react';
import { Letter } from '../../reusable/Letter';

export const Letters = () => {
  const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const clickHandler = letter => {
    console.log(letter);
  };

  return (
    <div className="letters">
      {abc.map(letter => <Letter key={letter} letter={letter} onClick={clickHandler} />)}
    </div>
  )
};
