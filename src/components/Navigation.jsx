import React from 'react';
import { ReactComponent as PlaySVG } from '../images/play_arrow.svg';
import { ReactComponent as NewGameSVG } from '../images/fiber_new.svg';
import { ReactComponent as SettingsSVG } from '../images/settings1.svg';
import { ReactComponent as StatsSVG } from '../images/pie_chart.svg';
import { ReactComponent as DatabaseSVG } from '../images/storage.svg';
import { ReactComponent as AboutSVG } from '../images/live_help.svg';
import { NavLink } from 'react-router-dom';
import { NavToolTip } from './reusable/NavToolTip';
import { useSelector, useDispatch } from 'react-redux';
import { NEW_GAME } from '../reducers/actions';
import { getWordFromCache } from '../utils/';

export const Navigation = () => {
  const { isOver } = useSelector(state => state.game);
  const { mode, word: settings } = useSelector(state => state.settings);
  const { words } = useSelector(state => state.db);
  const dispatch = useDispatch();

  const matchesSettings = ({ word, def }) => {
    const { skipWithoutDefinition, minLength } = settings;
    if(skipWithoutDefinition && !def) {
      return false;
    } else if(word[0].length < minLength) {
      return false;
    } else {
      return true;
    }
  }

  const handleNewGame = () => {
    if(mode === 'word') {
      let word = getWordFromCache() || {
        word: [words[Math.floor(Math.random() * words.length)]],
        def: '',
        wordType: '',
      };
      while(!matchesSettings(word)) {
        word = getWordFromCache() || {
          word: [words[Math.floor(Math.random() * words.length)]],
          def: '',
          wordType: '',
        };
      }
      dispatch(NEW_GAME(word));
    }
  };

  return (
    <nav className="main-nav">
      <ul className="nav-list">
        <li className="nav-list__item">
          {!isOver ? (
            <NavToolTip tooltip="Play">
              <NavLink activeClassName="nav-link--active" className="nav-link" to="/" exact={true}>
                <PlaySVG title="Play" className="icon icon--nav" />
              </NavLink>
            </NavToolTip>
          ) : (
            <NavToolTip tooltip="New Game">
              <NavLink activeClassName="nav-link--active" className="nav-link" to="/" exact={true} onClick={handleNewGame}>
                <NewGameSVG title="New Game" className="icon icon--nav" />
              </NavLink>
            </NavToolTip>
          )}
        </li>
        <li className="nav-list__item">
          <NavToolTip tooltip="Stats">
            <NavLink activeClassName="nav-link--active" className="nav-link" to="/stats">
              <StatsSVG title="Stats" className="icon icon--nav" />
            </NavLink>
          </NavToolTip>
        </li>
        <li className="nav-list__item">
          <NavToolTip tooltip="Database">
            <NavLink activeClassName="nav-link--active" className="nav-link" to="/database">
              <DatabaseSVG title="Database" className="icon icon--nav" />
            </NavLink>
          </NavToolTip>
        </li>
        <li className="nav-list__item">
          <NavToolTip tooltip="Settings">
            <NavLink activeClassName="nav-link--active" className="nav-link" to="/settings">
              <SettingsSVG title="Settings" className="icon icon--nav" />
            </NavLink>
          </NavToolTip>
        </li>
        <li className="nav-list__item">
          <NavToolTip tooltip="About">
            <NavLink activeClassName="nav-link--active" className="nav-link" to="/about">
              <AboutSVG title="About" className="icon icon--nav" />
            </NavLink>
          </NavToolTip>
        </li>
      </ul>
    </nav>
  );
};
