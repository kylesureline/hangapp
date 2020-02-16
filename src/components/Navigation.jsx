import React from 'react';
import { ReactComponent as PlaySVG } from '../images/play_arrow.svg';

export const Navigation = () => (
  <nav>
    <ul>
      <li><PlaySVG /></li>
      <li>Settings</li>
      <li>Stats</li>
      <li>Database</li>
      <li>About</li>
    </ul>
  </nav>
);
