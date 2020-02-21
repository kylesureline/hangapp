import React from 'react';

/** For changing modes
  * @prop   {Array}     options         Array of strings
  * @prop   {String}    selectedOption  A string representing which is selected
  * @prop   {Function}  onChange        A handler for changing selections
  */
export const Mode = ({
  options,
  selectedOption,
  onChange,
}) => (
  <>
    {options.map(option => (
      <label key={option}>
        <span>{option}</span>
        <input
          type="radio"
          name="mode"
          onChange={onChange}
          value={option}
          checked={option === selectedOption}
        />
      </label>
    ))}
  </>
);
