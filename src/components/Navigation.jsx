import React from 'react';
import { ReactComponent as PlaySVG } from '../images/play_arrow.svg';
import { ReactComponent as SettingsSVG } from '../images/settings1.svg';
import { ReactComponent as StatsSVG } from '../images/pie_chart.svg';
import { ReactComponent as DatabaseSVG } from '../images/storage.svg';
import { ReactComponent as AboutSVG } from '../images/live_help.svg';
import { NavLink } from 'react-router-dom';
import { NavToolTip } from './reusable/NavToolTip';

export const Navigation = () => (
  <nav className="main-nav">
    <ul className="nav-list">
      <li className="nav-list__item">
        <NavToolTip tooltip="Play">
          <NavLink activeClassName="nav-link--active" className="nav-link" to="/" exact={true}>
            <PlaySVG title="Play" className="icon icon--nav" />
          </NavLink>
        </NavToolTip>
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
