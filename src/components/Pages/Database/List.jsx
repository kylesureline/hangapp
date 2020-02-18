import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

export const List = ({ search }) => {
  const db = useSelector(state => state.db);
  const { mode } = useSelector(state => state.settings);
  const slice = 25;
  const filter = useCallback(value => {
    return value.toLowerCase().includes(search.toLowerCase());
  }, [search]);

  return (
    <ul className="database-list">
      {db[`${mode}s`].filter(filter).slice(0, slice).map((item, index) => (
        <li key={index} className="database-list__item">
          <a
            href={`https://www.merriam-webster.com/dictionary/${item}/`}
            alt={`${item}'s Definition on m-w.com`}
            >{item}</a>
        </li>
      ))}
      <li className="database-list__item database-list__item--first50">(Showing up to the first {slice} results)</li>
    </ul>
  );
};
