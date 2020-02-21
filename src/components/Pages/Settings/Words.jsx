import React from 'react';

export const Words = ({ onChange, settings }) => (
  <>
    <label>
      <span>show word type:</span>
      <input
        type="checkbox"
        checked={settings.showWordType}
        onChange={() => onChange(
          {
            showWordType: !settings.showWordType
          }
        )}
      />
    </label>
    <label>
      <span>show definition:</span>
      <input
        type="checkbox"
        checked={settings.showDefinition}
        onChange={() => onChange(
          {
            showDefinition: !settings.showDefinition
          }
        )}
      />
    </label>
    <label>
      <span>skip words without a definition:</span>
      <input
        type="checkbox"
        checked={settings.skipWithoutDefinition}
        onChange={() => onChange(
          {
            skipWithoutDefinition: !settings.skipWithoutDefinition
          }
        )}
      />
    </label>
  </>
)
