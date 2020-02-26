import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
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

  return (
    <div className={`letters${isOver ? ' letters--disabled' : ''}`}>
      {abc.map(letter => <Letter key={letter} letter={letter} onClick={clickHandler} guessedLetters={guessedLetters} />)}
      <KeyboardEventHandler
        handleKeys={abc}
        onKeyEvent={clickHandler}
      />
    </div>
  )
};
