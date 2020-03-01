import React, { useEffect } from 'react';
import { Letter } from '../../reusable/Letter';
import { useSelector, useDispatch } from 'react-redux';
import { GUESS_LETTER } from '../../../reducers/actions';

export const Letters = () => {
  const dispatch = useDispatch();
  const abc = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const { guessedLetters, isOver } = useSelector(state => state.game);

  const clickHandler = letter => {
    if(!isOver) {
      dispatch(GUESS_LETTER(letter));
    }
  };

  const handleKeyDown = e => {
    const { key } = e;
    if(abc.includes(key)) {
      clickHandler(key);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`letters${isOver ? ' letters--disabled' : ''}`}>
      {abc.map(letter => <Letter key={letter} letter={letter} onClick={clickHandler} guessedLetters={guessedLetters} />)}
    </div>
  )
};
