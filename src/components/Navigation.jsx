import React from 'react';
import { ReactComponent as PlaySVG } from '../images/play_arrow.svg';
import { ReactComponent as NewGameSVG } from '../images/fiber_new.svg';
import { ReactComponent as SettingsSVG } from '../images/settings1.svg';
import { ReactComponent as StatsSVG } from '../images/pie_chart.svg';
import { ReactComponent as DatabaseSVG } from '../images/storage.svg';
import { ReactComponent as ShareSVG } from '../images/share.svg';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { NEW_GAME } from '../reducers/actions';
import { useRandom } from '../hooks/useRandom';

const shareObj = {
  title: 'Hangapp',
  text: 'A hangman web app',
  url: 'https://kylesureline.com/hangapp'
};

export const Navigation = () => {
  const { isOver } = useSelector(state => state.game);
  const { mode } = useSelector(state => state.settings);
  const dispatch = useDispatch();
  const { getRandomWord, getRandomCategory } = useRandom();

  const handleNewGame = () => {
    if(mode === 'dictionary') {
      dispatch(NEW_GAME(getRandomWord()));
    } else {
      dispatch(NEW_GAME(getRandomCategory()));
    }

  };

  const handleShare = () => {
    navigator.share(shareObj).then(() => {
      console.log('Thanks for sharing!');
    })
    .catch(console.error);
  };

  return (
    <nav className="main-nav">
      <ul className="nav-list">
        {isOver && (
          <li className="nav-list__item">
            <Link className="nav-link" to="/" onClick={handleNewGame}>
              <NewGameSVG title="New Game" className="icon icon--nav" />
            </Link>
          </li>
        )}
        <li className="nav-list__item">
          <NavLink activeClassName="nav-link--active" className="nav-link" to="/" exact={true}>
            <PlaySVG title="Play" className="icon icon--nav" />
          </NavLink>
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
        {navigator.canShare && navigator.canShare(shareObj) && (
          <li className="nav-list__item">
            <span className="nav-link" onClick={handleShare}>
              <ShareSVG title="Share" className="icon icon--nav" />
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};
