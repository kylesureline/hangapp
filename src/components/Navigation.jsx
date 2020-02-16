import React from 'react';
import { ReactComponent as PlaySVG } from '../images/play_arrow.svg';
import { ReactComponent as SettingsSVG } from '../images/settings1.svg';
import { ReactComponent as StatsSVG } from '../images/pie_chart.svg';
import { ReactComponent as DatabaseSVG } from '../images/storage.svg';
import { ReactComponent as AboutSVG } from '../images/live_help.svg';
import { NavLink } from 'react-router-dom';

export const Navigation = () => (
  <nav className="main-nav">
    <ul className="nav-list">
      <li className="nav-list__item">
        <NavLink activeClassName="nav-link--active" className="nav-link" to="/">
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
      <li className="nav-list__item">
        <NavLink activeClassName="nav-link--active" className="nav-link" to="/about">
          <AboutSVG title="About" className="icon icon--nav" />
        </NavLink>
      </li>
    </ul>
  </nav>
);
