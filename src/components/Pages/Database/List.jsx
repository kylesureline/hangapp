import React from 'react';
import { useSelectedWords } from '../../../hooks/useSelectedWords';

export const List = ({ search }) => {
  const { selectedWords } = useSelectedWords(search);
  const slice = 25;

  return (
    <ul className="database-list">
      {selectedWords.slice(0, slice).map(({ word }, index) => (
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
