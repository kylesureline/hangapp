import React from 'react';
import { useSelected } from '../../../hooks/useSelected';
// import { numberWithCommas } from '../../../utils/';
import { ToggleSwitch } from '../../reusable/ToggleSwitch';

export const Categories = ({ onChange, categories }) => {
  const { selected } = useSelected('');

  return (
    <div className="settings-labels">
      <legend>{selected.length} items selected</legend>
      <label className="label">
        <span className="label__text">recipes:</span>
        <ToggleSwitch
          checked={categories.includes('recipes')}
          onChange={() => onChange('recipes')}
        />
      </label>
      <label className="label">
        <span className="label__text">dogs:</span>
        <ToggleSwitch
          checked={categories.includes('dogs')}
          onChange={() => onChange('dogs')}
        />
      </label>
    </div>
  );
};
