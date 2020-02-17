import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

export const List = ({ search }) => {
  const db = useSelector(state => state.db);
  const { mode } = useSelector(state => state.settings);
  const [results, setResults] = useState();

  return (
    <ul className="database-list">
      {db[`${mode}s`].map((item, index) => (
        <li className="database-list__item">{item}</li>
      ))}
    </ul>
  );
};
