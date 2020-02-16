import React from 'react';
import { ReactComponent as PlaySVG } from '../images/play_arrow.svg';
import { ReactComponent as SettingsSVG } from '../images/settings1.svg';
import { ReactComponent as StatsSVG } from '../images/stars.svg';
import { ReactComponent as DatabaseSVG } from '../images/storage.svg';
import { ReactComponent as AboutSVG } from '../images/person.svg';

export const Navigation = () => (
  <nav className="main-nav">
    <ul className="nav-list">
      <li className="nav-list__item">
        <PlaySVG title="Play" className="icon icon--nav" />
      </li>
      <li className="nav-list__item">
        <SettingsSVG title="Settings" className="icon icon--nav" />
      </li>
      <li className="nav-list__item">
        <StatsSVG title="Stats" className="icon icon--nav" />
      </li>
      <li>
        <DatabaseSVG title="Database" className="icon icon--nav" />
      </li>
      <li>
        <AboutSVG title="About" className="icon icon--nav" />
      </li>
    </ul>
  </nav>
);
