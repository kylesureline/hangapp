import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ADD_WORD_WITH_DEF } from '../reducers/actions';
import { fetchData, isOnline, formatWordObj, saveToCache } from '../utils';
import { MAX_TO_CACHE } from '../db/globals';

export const Database = ({ children }) => {
  const { words: wordsSettings } = useSelector(state => state.settings);
  const { words } = useSelector(state => state.db);
  const { withDef, withoutDef } = words;

  const dispatch = useDispatch();

  // fetches definitions and stores them in localStorage
  useEffect(() => {
    let isUnmounted = false;
    let interval;

    interval = setInterval(() => {
      // don't try to fetch if offline
      if(isOnline() && withDef.length < MAX_TO_CACHE) {
        const word = withoutDef[Math.floor(Math.random() * withoutDef.length)];
        fetchData(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=cb690753-1eb8-4661-a7f4-9adf25057760`)
          .then(data => {
            if(!isUnmounted) {
              if(!data.every(e => typeof e === 'string')) {
                // some words have multiple meanings
                // choose one at random
                const { fl: wordType, shortdef: defs } = data[Math.floor(Math.random() * data.length)];
                const def = defs[Math.floor(Math.random() * defs.length)];

                // console.log(word, wordType, def);
                if(withDef.length < MAX_TO_CACHE) {
                  // addToCache({word: [word], wordType, def});
                  dispatch(ADD_WORD_WITH_DEF(formatWordObj(word, wordType, def)));
                }
              }
            }
          })
      }
    }, 100);

    return () => {
      isUnmounted = true;
      clearInterval(interval);
    }
  }, [withDef, withoutDef, dispatch]);

  // sync to localStorage
  useEffect(() => {
    saveToCache('db-words-withDef', withDef);
  }, [withDef]);
  useEffect(() => {
    saveToCache('settings-words', wordsSettings);
  }, [wordsSettings])

  return children;
}
