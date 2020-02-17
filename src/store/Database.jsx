import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import wordBank from '../db/wordBank';
import { ADD_WORDS, DONE_COMPILING } from '../reducers/actions';

export const Database = ({ children }) => {
  const { mode } = useSelector(state => state.settings);
  const db = useSelector(state => state.db);
  const dispatch = useDispatch();

  useEffect(() => {
    if(mode === 'word') {
      wordBank.forEach((chunk, index)=> {
        setTimeout(() => {
          dispatch(ADD_WORDS(chunk));
          if(index === wordBank.length - 1) {
            dispatch(DONE_COMPILING());
          }
        }, 100 * index);
      });
    }
  }, [mode]);

  return children;
}
