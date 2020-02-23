import React from 'react';

export const ToggleSwitch = ({ checked, onChange }) => (
  <div className="switch">
    <input type="checkbox" checked={checked} onChange={onChange} />
    <span class="switch__slider" />
  </div>
);
