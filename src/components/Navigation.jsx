import React from 'react';
import { ReactComponent as PlaySVG } from '../images/play_arrow.svg';
import { ReactComponent as NewGameSVG } from '../images/fiber_new.svg';
import { ReactComponent as SettingsSVG } from '../images/settings1.svg';
import { ReactComponent as StatsSVG } from '../images/pie_chart.svg';
import { ReactComponent as DatabaseSVG } from '../images/storage.svg';
import { ReactComponent as AboutSVG } from '../images/live_help.svg';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { NEW_GAME } from '../reducers/actions';
import { useRandom } from '../hooks/useRandom';

export const Navigation = () => {
  const { isOver } = useSelector(state => state.game);
  const { mode } = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const { getRandomWord } = useRandom();

  const handleNewGame = () => {
    if(mode === 'words') {
      dispatch(NEW_GAME(getRandomWord()));
    }
  };

  return (
    <nav className="main-nav">
      <ul className="nav-list">
        <li className="nav-list__item">
          {!isOver ? (
            <NavLink activeClassName="nav-link--active" className="nav-link" to="/" exact={true}>
              <PlaySVG title="Play" className="icon icon--nav" />
            </NavLink>
          ) : (
            <NavLink activeClassName="nav-link--active" className="nav-link" to="/" exact={true} onClick={handleNewGame}>
              <NewGameSVG title="New Game" className="icon icon--nav" />
            </NavLink>
          )}
        </li>
        <li className="nav-list__item">
          <NavLink activeClassName="nav-link--active" className="nav-link" to="/stats">
            <StatsSVG title="Stats" className="icon icon--nav" />
          </NavLink>
        </li>
        <li className="nav-list__item">
          <NavLink activeClassName="nav-link--active" className="nav-link" to="/database">
            <DatabaseSVG title="Database" className="icon icon--nav" />
          </NavLink>
        </li>
        <li className="nav-list__item">
          <NavLink activeClassName="nav-link--active" className="nav-link" to="/settings">
            <SettingsSVG title="Settings" className="icon icon--nav" />
          </NavLink>
        </li>
        <li className="nav-list__item">
          <NavLink activeClassName="nav-link--active" className="nav-link" to="/about">
            <AboutSVG title="About" className="icon icon--nav" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
