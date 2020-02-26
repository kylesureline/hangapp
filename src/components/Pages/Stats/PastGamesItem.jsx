import React from 'react';
import { toRelevantTimeString } from '../../../utils';

export const PastGamesItem = ({ game }) => {
  const { answer, timestamp, won } = game;

  return (
    <li className="past-games__item">
      <span>{answer.words.join(' ')}</span>
      <span>{won ? 'won' : 'lost'}</span>
      <span>{toRelevantTimeString(timestamp)}</span>
    </li>
  );
};
