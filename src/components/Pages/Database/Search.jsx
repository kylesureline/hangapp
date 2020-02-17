import React from 'react';

export const Search = ({ value, setValue }) => {
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
    <input
      type="text"
      className="search"
      value={value}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
      autoFocus={true}
      placeholder="Search..."
    />
  );
};
