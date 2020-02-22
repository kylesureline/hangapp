import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import wordBank from '../db/wordBank';
import { ADD_WORD_WITH_DEF, ADD_WORDS_WITHOUT_DEF, DONE_COMPILING } from '../reducers/actions';
import { fetchData, isOnline, formatWordObj, saveToCache } from '../utils';

export const Database = ({ children }) => {
  const { mode, words: wordsSettings } = useSelector(state => state.settings);
  const { doneCompiling, words } = useSelector(state => state.db);
  const CACHE_MAX = 500;

  const dispatch = useDispatch();

  // turns separate chunks into one big array
  useEffect(() => {
    if(mode === 'words') {
      wordBank.forEach((chunk, index)=> {
        setTimeout(() => {
          dispatch(ADD_WORDS_WITHOUT_DEF(chunk));
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
        if(isOnline() && words.withDef.length < CACHE_MAX) {
          const word = words.withoutDef[Math.floor(Math.random() * words.withoutDef.length)];
          fetchData(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=cb690753-1eb8-4661-a7f4-9adf25057760`)
            .then(data => {
              if(!isUnmounted) {
                if(!data.every(e => typeof e === 'string')) {
                  // some words have multiple meanings
                  // choose one at random
                  const { fl: wordType, shortdef: defs } = data[Math.floor(Math.random() * data.length)];
                  const def = defs[Math.floor(Math.random() * defs.length)];

                  // console.log(word, wordType, def);
                  if(words.withDef.length < CACHE_MAX) {
                    // addToCache({word: [word], wordType, def});
                    dispatch(ADD_WORD_WITH_DEF(formatWordObj(word, wordType, def)));
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
  }, [doneCompiling, words, dispatch]);

  // sync to localStorage
  useEffect(() => {
    saveToCache('db-words-withDef', words.withDef);
  }, [words.withDef]);
  useEffect(() => {
    saveToCache('settings-words', wordsSettings);
  }, [wordsSettings])

  return children;
}
