import React from 'react';
import { ListItemCategory } from './ListItemCategory';

export const ListItem = ({ mode, item }) => {
  return (
    <li className="database-list__item">
      {mode === 'dictionary' ? (
        <a
          href={`https://www.merriam-webster.com/dictionary/${item.words.join(' ')}/`}
          alt={`${item.words.join(' ')}'s Definition on m-w.com`}
          target="_blank"
          rel="noopener noreferrer"
          >{item.words.join(' ')}</a>
      ) : (
        <ListItemCategory item={item} />
      )}
    </li>
  );
};
