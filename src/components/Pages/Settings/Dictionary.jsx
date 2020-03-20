import React from "react";
import { useSelected } from "../../../hooks/useSelected";
import { numberWithCommas } from "../../../utils/";
import { ToggleSwitch } from "./ToggleSwitch";

export const Dictionary = ({ onChange, dictionary }) => {
  const { selected } = useSelected("");

  return (
    <div className="settings-labels">
      <legend>{numberWithCommas(selected.length)} items selected</legend>
      <label className="label">
        <span className="label__text">show word type:</span>
        <ToggleSwitch
          checked={dictionary.showWordType}
          onChange={() =>
            onChange({
              showWordType: !dictionary.showWordType
            })
          }
        />
      </label>
      <label className="label">
        <span className="label__text">show definition:</span>
        <ToggleSwitch
          checked={dictionary.showDefinition}
          onChange={() =>
            onChange({
              showDefinition: !dictionary.showDefinition
            })
          }
        />
      </label>
      <label className="label">
        <span className="label__text">skip words without a definition:</span>
        <ToggleSwitch
          checked={dictionary.skipWithoutDefinition}
          onChange={() =>
            onChange({
              skipWithoutDefinition: !dictionary.skipWithoutDefinition
            })
          }
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
            onChange={e =>
              onChange({
                minLength: e.target.value
              })
            }
          />
        </span>
      </label>
    </div>
  );
};
