import React from 'react';
import { useSelectedWords } from '../../../hooks/useSelectedWords';
import { numberWithCommas } from '../../../utils/';
import { ToggleSwitch } from '../../reusable/ToggleSwitch';

export const Dictionary = ({ onChange, dictionary }) => {
  const { selectedWords } = useSelectedWords('');

  return (
    <div className="dictionary-settings">
      <label className="label">
        <span className="label__text">show word type:</span>
        <ToggleSwitch
          checked={dictionary.showWordType}
          onChange={() => onChange(
            {
              showWordType: !dictionary.showWordType
            }
          )}
        />
      </label>
      <label className="label">
        <span className="label__text">show definition:</span>
        <ToggleSwitch
          checked={dictionary.showDefinition}
          onChange={() => onChange(
            {
              showDefinition: !dictionary.showDefinition
            }
          )}
        />
      </label>
      <label className="label">
        <span className="label__text">skip words without a definition:</span>
        <ToggleSwitch
          checked={dictionary.skipWithoutDefinition}
          onChange={() => onChange(
            {
              skipWithoutDefinition: !dictionary.skipWithoutDefinition
            }
          )}
        />
      </label>
      <label className="label label--min-length">
        <span className="label__text">
          <span>minimum word length:</span>
          <span>{dictionary.minLength}</span>
        </span>
        <span className="label__range">
          <input
            type="range"
            min={1}
            max={8}
            value={dictionary.minLength}
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
