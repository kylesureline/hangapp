import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { formatWordObj } from '../utils';

export const useSelectedWords = (search = '') => {
  const { mode, dictionary } = useSelector(state => state.settings);
  const db = useSelector(state => state.db);
  const filter = useCallback(({ words }) => (
    words.join(' ').toLowerCase().includes(search.toLowerCase()) && words.join(' ').length >= dictionary.minLength
  ), [search, dictionary.minLength]);

  const selectedWords = useCallback(() => {
    if(mode === 'dictionary') {
      if(dictionary.skipWithoutDefinition) {
        return db.dictionary.withDef;
      } else {
        return db.dictionary.withoutDef.map(item => formatWordObj(item));
      }
    } else {
      return []; // TODO: add support for phrases
    }
  }, [mode, dictionary, db]);

  return {
     selectedWords: selectedWords().filter(filter)
  };
};
