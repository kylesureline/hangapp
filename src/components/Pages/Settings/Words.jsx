import React from 'react';
import { useSelectedWords } from '../../../hooks/useSelectedWords';
import { numberWithCommas } from '../../../utils/';
import { ToggleSwitch } from '../../reusable/ToggleSwitch';

export const Words = ({ onChange, settings }) => {
  const { selectedWords } = useSelectedWords('');

  return (
    <div className="words-settings">
      <label className="label">
        <span className="label__text">show word type:</span>
        <ToggleSwitch
          checked={settings.showWordType}
          onChange={() => onChange(
            {
              showWordType: !settings.showWordType
            }
          )}
        />
      </label>
      <label className="label">
        <span className="label__text">show definition:</span>
        <ToggleSwitch
          checked={settings.showDefinition}
          onChange={() => onChange(
            {
              showDefinition: !settings.showDefinition
            }
          )}
        />
      </label>
      <label className="label">
        <span className="label__text">skip words without a definition:</span>
        <ToggleSwitch
          checked={settings.skipWithoutDefinition}
          onChange={() => onChange(
            {
              skipWithoutDefinition: !settings.skipWithoutDefinition
            }
          )}
        />
      </label>
      <label className="label label--min-length">
        <span className="label__text">
          <span>minimum word length:</span>
          <span>{settings.minLength}</span>
        </span>
        <span className="label__range">
          <input
            type="range"
            min={1}
            max={8}
            value={settings.minLength}
            onChange={e => onChange(
              {
                minLength: e.target.value
              }
            )}
          />
        </span>
        <span className="label__results">({numberWithCommas(selectedWords.length)} results)</span>
      </label>
    </div>
  );
};
