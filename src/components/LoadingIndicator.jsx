import React from 'react';
import { withoutDefCount } from '../db/wordBank';
import { MAX_TO_CACHE } from '../db/globals';
import { useSelector } from 'react-redux';

export const LoadingIndicator = () => {
  const max = withoutDefCount + MAX_TO_CACHE;
  const { words } = useSelector(state => state.db);
  const { withDef, withoutDef } = words;

  const value = withDef.length + withoutDef.length;

  return (
    <div className={`loading-indicator${value === max ? ' loading-indicator--complete' : ''}`}>
      <progress value={value} max={max} title={value === max ? 'Database loaded' : 'Loading...'} />
    </div>
  );
};
