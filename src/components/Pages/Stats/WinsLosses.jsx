import React from "react";

export const WinsLosses = ({ data }) => {
  const winCount = data.filter(game => game.won).length || 0;
  const winPerc = (winCount / data.length) * 100;
  const lostCount = data.filter(game => !game.won).length || 0;
  const lostPerc = (lostCount / data.length) * 100;

  const formatMetric = (value, singular, plural, perc) => {
    return `${value === 1 ? `1 ${singular}` : `${value} ${plural}`} (${perc}%)`;
  };

  return (
    <div className="wins-losses">
      <progress value={winCount} max={winCount + lostCount} />
      <p className="wins-losses__values">
        <span>{formatMetric(winCount, "win", "wins", winPerc)}</span>
        <span>{formatMetric(lostCount, "loss", "losses", lostPerc)}</span>
      </p>
    </div>
  );
};
