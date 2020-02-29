import React from 'react';
import { MAX_TO_CACHE } from '../db/globals';
import { useSelector } from 'react-redux';

export const LoadingIndicator = () => {
  const max = MAX_TO_CACHE * 1; // 1 database
  const { dictionary } = useSelector(state => state.db);
  const { withDef } = dictionary;

  const value = withDef.length;

  return (
    <div className={`loading${value >= max ? ' loading--complete' : ''}`}>
      <span className="loading__info">{value === max ? 'database complete!' : 'building database...'}</span>
      <progress
        className="loading__progress"
        value={value}
        max={max}
        title={value === max ? 'Database loaded' : 'Loading...'}
      />
    </div>
  );
};
