import React from 'react';
import { PastGamesItem } from './PastGamesItem';

export const PastGames = ({ data }) => {
  return (
    <>
      <h2 className="header">past games</h2>
      <ul className="past-games">
        {!!data.length ? (
          data.map(game => {
            return <PastGamesItem key={game.timestamp} game={game} />;
          })
        ) : (
          <li className="past-games__item">No past games to display...</li>
        )}
      </ul>
    </>
  );
};
