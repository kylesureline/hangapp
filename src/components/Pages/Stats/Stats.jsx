import React from 'react';
import { PastGames } from './PastGames';
import { getFromLS } from '../../../utils';

export const Stats = () => {
  const data = getFromLS('past-games');

  return (
    <main className="page page--stats">
      <PastGames data={data} />
    </main>
  );
};
