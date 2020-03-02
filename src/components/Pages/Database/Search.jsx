import React from 'react';
import { useSelected } from '../../../hooks/useSelected';
import { numberWithCommas } from '../../../utils/';

export const Search = ({ value, setValue, isOver }) => {
  const { selected } = useSelected(value);

  const handleChange = e => {
    const { value } = e.target;
    setValue(value);
  };

  const handleKeyUp = e => {
    if(e.keyCode === 27) {
      setValue('');
    }
  }

  return (
    <div className="search">
      <input
        type="text"
        className="search__input"
        value={value}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        autoFocus={isOver}
        placeholder="Search..."
      />
      <span className="search__count">{numberWithCommas(selected.length)} items</span>
    </div>
  );
};
