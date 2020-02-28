import React from 'react';

export const WinsLosses = ({ data }) => {
  const winCount = data.filter(game => game.won).length;
  const winPerc = (winCount / data.length) * 100;
  const lostCount = data.filter(game => !game.won).length;
  const lostPerc = (lostCount / data.length) * 100;
  return (
    <div className="wins-losses">
      <div
        className="wins"
        style={{
          // flex: `0 1 ${winPerc}%`
          width: `${winPerc}%`,
        }}
        >{winCount} ({winPerc.toFixed(0)}%)
      </div>
      <div
        className="losses"
        style={{
          // flex: `0 1 ${lostPerc}%`
          width: `${lostPerc}%`,
        }}
        >{lostCount} ({lostPerc.toFixed(0)}%)
      </div>
    </div>
  );
};
