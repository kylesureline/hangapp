import React from 'react';
import { PastGames } from './PastGames';
import { WinsLosses } from './WinsLosses';
import { getFromLS } from '../../../utils';

export const Stats = () => {
  const data = getFromLS('past-games') || [];

  return (
    <main className="page page--stats">
      <h2 className="header">wins / losses</h2>
      <WinsLosses data={data} />
      <h2 className="header">past games</h2>
      <PastGames data={data} />
    </main>
  );
};
