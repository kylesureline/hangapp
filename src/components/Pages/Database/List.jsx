import React from 'react';
import { useSelected } from '../../../hooks/useSelected';
import { useSelector } from 'react-redux';
import { ListItem } from './ListItem';

export const List = ({ search, isOver }) => {
  const { selected } = useSelected(search);
  const { mode } = useSelector(state => state.settings);
  const slice = 25;

  return isOver && (
    <ul className="database-list">
      {selected.slice(0, slice).map((item, index) => {
        return (
          <ListItem key={index} mode={mode} item={item} />
        );
      })}
      <li className="database-list__item database-list__item--message">(Showing up to the first {slice} results)</li>
    </ul>
  );
};
