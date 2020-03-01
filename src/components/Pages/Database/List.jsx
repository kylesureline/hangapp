import React from 'react';
import { useSelected } from '../../../hooks/useSelected';
import { useDispatch, useSelector } from 'react-redux';
import { END_GAME } from '../../../reducers/actions';
import { ListItem } from './ListItem';

export const List = ({ search, isOver }) => {
  const { selected } = useSelected(search);
  const { mode } = useSelector(state => state.settings);
  const dispatch = useDispatch();

  const slice = 25;

  const handleClick = e => {
    // TODO: implement confirmation modal
    global.confirm('Are you sure you want to start a new game?') && dispatch(END_GAME());
  };

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
