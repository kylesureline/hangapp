import React from 'react';

export const ToggleSwitch = ({ checked, onChange }) => (
  <div className="switch">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span className="switch__slider" />
  </div>
);
