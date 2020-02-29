import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { formatWordObj } from '../utils';

export const useSelectedWords = (search = '') => {
  const { mode, words: wordsSettings } = useSelector(state => state.settings);
  const db = useSelector(state => state.db);
  const filter = useCallback(({ words }) => (
    words.join(' ').toLowerCase().includes(search.toLowerCase()) && words.join(' ').length >= wordsSettings.minLength
  ), [search, wordsSettings.minLength]);

  const selectedWords = useCallback(() => {
    if(mode === 'dictionary') {
      if(wordsSettings.skipWithoutDefinition) {
        return db.words.withDef;
      } else {
        return db.words.withoutDef.map(item => formatWordObj(item));
      }
    } else {
      return []; // TODO: add support for phrases
    }
  }, [mode, wordsSettings, db]);

  return {
     selectedWords: selectedWords().filter(filter)
  };
};
