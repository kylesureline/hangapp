import React from 'react';
import { PastGames } from './PastGames';
import { WinsLosses } from './WinsLosses';
import { getFromLS } from '../../../utils';

export const Stats = () => {
  const data = getFromLS('past-games') || [];

  return (
    <main className="page page--stats">
      {!!data.length ? (
        <>
          <div className="stat-widget stat-widget--wins-losses">
            <h2 className="header">wins / losses</h2>
            <WinsLosses data={data} />
          </div>
          <div className="stat-widget stat-widget--past-games">
            <h2 className="header">past games</h2>
            <PastGames data={data} />
          </div>
        </>
      ) : (
        <div className="no-games">no past games to display...</div>
      )}
    </main>
  );
};
