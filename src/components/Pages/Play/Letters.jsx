import React from 'react';
import { Letter } from '../../reusable/Letter';
import { useDispatch } from 'react-redux';
import { GUESS_LETTER } from '../../../reducers/actions';

export const Letters = () => {
  const dispatch = useDispatch();
  const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const clickHandler = letter => {
    dispatch(GUESS_LETTER(letter.toLowerCase()));
  };

  return (
    <div className="letters">
      {abc.map(letter => <Letter key={letter} letter={letter} onClick={clickHandler} />)}
    </div>
  )
};
