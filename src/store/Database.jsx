import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import wordBank from '../db/wordBank';
import { ADD_WORDS, DONE_COMPILING } from '../reducers/actions';
import { fetchData, isOnline, getCache, addToCache } from '../utils';

export const Database = ({ children }) => {
  const { mode } = useSelector(state => state.settings);
  const { doneCompiling, words } = useSelector(state => state.db);
  const CACHE_MAX = 500;

  const dispatch = useDispatch();

  // turns separate chunks into one big array
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
  }, [mode, dispatch]);

  // fetches definitions and stores them in localStorage
  useEffect(() => {
    let isUnmounted = false;
    let interval;

    if(doneCompiling) {
      interval = setInterval(() => {
        // don't try to fetch if offline
        if(isOnline() && getCache().length < CACHE_MAX) {
          const word = words[Math.floor(Math.random() * words.length)];
          fetchData(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=cb690753-1eb8-4661-a7f4-9adf25057760`)
            .then(data => {
              if(!isUnmounted) {
                if(!data.every(e => typeof e === 'string')) {
                  // some words have multiple meanings
                  // choose one at random
                  const { fl: wordType, shortdef: defs } = data[Math.floor(Math.random() * data.length)];
                  const def = defs[Math.floor(Math.random() * defs.length)];

                  // console.log(word, wordType, def);
                  if(getCache().length < CACHE_MAX) {
                    addToCache({word, wordType, def});
                  }
                }
              }
            })
        }
      }, 250);
    }

    return () => {
      isUnmounted = true;
      clearInterval(interval);
    }
  }, [doneCompiling, words]);

  return children;
}
