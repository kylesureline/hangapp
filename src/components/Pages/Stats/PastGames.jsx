import React from "react";
import { PastGamesItem } from "./PastGamesItem";

export const PastGames = ({ data }) => (
  <ul className="past-games">
    {data.map(game => {
      return <PastGamesItem key={game.timestamp} game={game} />;
    })}
  </ul>
);
