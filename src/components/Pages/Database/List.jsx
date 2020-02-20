import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { formatWordObj } from '../../../utils';

export const List = ({ search }) => {
  const { mode, words } = useSelector(state => state.settings);
  const db = useSelector(state => state.db);
  const slice = 25;
  const filter = useCallback(({ word }) => word.join('').toLowerCase().includes(search.toLowerCase()), [search]);

  const selectedWords = useCallback(() => {
    return db[mode][words.skipWithoutDefinition ? 'withDef' : 'withoutDef'].map(word => words.skipWithoutDefinition ? (word) : (formatWordObj(word)));
  }, [mode, words, db]);

  return (
    <ul className="database-list">
      {selectedWords().filter(filter).slice(0, slice).map(({ word }, index) => (
        <li key={index} className="database-list__item">
          <a
            href={`https://www.merriam-webster.com/dictionary/${word}/`}
            alt={`${word}'s Definition on m-w.com`}
            >{word}</a>
        </li>
      ))}
      <li className="database-list__item database-list__item--first50">(Showing up to the first {slice} results)</li>
    </ul>
  );
};
