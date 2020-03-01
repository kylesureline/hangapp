import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { formatWordObj } from '../utils';

export const useSelected = (search = '') => {
  const { mode, dictionary, categories } = useSelector(state => state.settings);
  const db = useSelector(state => state.db);
  const filter = useCallback(({ words }) => (
    words.join(' ').toLowerCase().includes(search.toLowerCase()) && words.join(' ').length >= dictionary.minLength
  ), [search, dictionary.minLength]);

  const selected = useCallback(() => {
    if(mode === 'dictionary') {
      if(dictionary.skipWithoutDefinition) {
        return db.dictionary.withDef;
      } else {
        return db.dictionary.withoutDef.map(item => formatWordObj(item));
      }
    } else {
      return categories.map(category => db.categories[category]).reduce((acc, array) => [...acc, ...array], []);
    }
  }, [mode, dictionary, db]);

  return {
     selected: selected().filter(filter)
  };
};
