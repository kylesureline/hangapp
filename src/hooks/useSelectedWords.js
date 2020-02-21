import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { formatWordObj } from '../utils';

export const useSelectedWords = (search = '') => {
  const { mode, words } = useSelector(state => state.settings);
  const db = useSelector(state => state.db);
  const filter = useCallback(({ word }) => word.join(' ').toLowerCase().includes(search.toLowerCase()) && word.join(' ').length >= words.minLength, [search]);

  const selectedWords = useCallback(() => {
    if(mode === 'words') {
      return db.words[words.skipWithoutDefinition ? 'withDef' : 'withoutDef'].map(word => words.skipWithoutDefinition ? (word) : (formatWordObj(word)));
    } else {
      return []; // TODO: add support for phrases
    }
  }, [mode, words, db]);

  return {
     selectedWords: selectedWords().filter(filter)
  };
};
