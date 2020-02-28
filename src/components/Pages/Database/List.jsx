import React from 'react';
import { useSelectedWords } from '../../../hooks/useSelectedWords';
import { useDispatch, useSelector } from 'react-redux';
import { END_GAME } from '../../../reducers/actions';

export const List = ({ search, isOver }) => {
  const { selectedWords } = useSelectedWords(search);
  const { mode } = useSelector(state => state.settings);
  const dispatch = useDispatch();

  const slice = 25;

  const handleClick = e => {
    // TODO: implement confirmation modal
    global.confirm('Are you sure you want to start a new game?') && dispatch(END_GAME());
  };

  return isOver ? (
    <ul className="database-list">
      {selectedWords.slice(0, slice).map(({ words }, index) => {
        return (
          <li key={index} className="database-list__item">
            {mode === 'words' ? (
              <a
                href={`https://www.merriam-webster.com/dictionary/${words}/`}
                alt={`${words}'s Definition on m-w.com`}
                target="_blank"
                rel="noopener noreferrer"
                >{words}</a>
            ) : (
              words
            )}
          </li>
        );
      })}
      <li className="database-list__item database-list__item--first50">(Showing up to the first {slice} results)</li>
    </ul>
  ) : (
    <div className="database-list database-list--warning">
      <p>Finish your current game to see the database.</p>
      <p>(You may also <span className="link link--inline" onClick={handleClick}>click here to end your current game</span>)</p>
    </div>
  );
};
