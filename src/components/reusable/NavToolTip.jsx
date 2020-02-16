import React from 'react';

export const NavToolTip = ({ tooltip, children }) => (
  <div className="nav-tooltip">
    <div className="nav-tooltip__content">{tooltip}</div>
    {children}
  </div>
);
