import React from 'react';
import { useSelectedWords } from '../../../hooks/useSelectedWords';
import { numberWithCommas } from '../../../utils/';

export const Search = ({ value, setValue, isOver }) => {
  const { selectedWords } = useSelectedWords(value);

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
      <span className="search__count">{numberWithCommas(selectedWords.length)}</span>
    </div>
  );
};
