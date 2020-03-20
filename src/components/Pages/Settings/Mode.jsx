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
  <div className="mode">
    {options.map(option => (
      <label key={option} className={`option${option === selectedOption ? ' option--selected' : ''}`}>
        <span className="option__text">{option}</span>
        <input
          type="radio"
          name="mode"
          onChange={onChange}
          value={option}
          checked={option === selectedOption}
          className="option__input"
        />
      </label>
    ))}
  </div>
);
