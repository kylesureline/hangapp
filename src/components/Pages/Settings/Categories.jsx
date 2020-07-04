import React from "react";
import { useSelected } from "../../../hooks/useSelected";
// import { numberWithCommas } from '../../../utils/';
import { ToggleSwitch } from "./ToggleSwitch";

export const Categories = ({
  onChange,
  activeCategories,
  availableCategories
}) => {
  const { selected } = useSelected("");

  return (
    <div className="settings-labels">
      <legend>{selected.length} items selected</legend>
      {availableCategories.map(category => {
        return (
          <label key={category} className="label">
            <span className="label__text">{category}:</span>
            <ToggleSwitch
              checked={activeCategories.includes(category)}
              onChange={() => onChange(category)}
            />
          </label>
        );
      })}
    </div>
  );
};
