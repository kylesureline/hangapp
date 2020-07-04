import React from "react";
import { toRelevantTimeString } from "../../../utils";
import { ReactComponent as WonSVG } from "../../../images/check_circle.svg";
import { ReactComponent as LostSVG } from "../../../images/cancel.svg";

export const PastGamesItem = ({ game }) => {
  const { answer, timestamp, won } = game;

  return (
    <li className="past-games__item">
      {won ? (
        <WonSVG
          className="icon icon--won"
          title={`Game won on ${new Date(timestamp).toLocaleString("default", {
            month: "short",
            day: "2-digit",
            year: "numeric"
          })}`}
        />
      ) : (
        <LostSVG
          className="icon icon--lost"
          title={`Game lost on ${new Date(timestamp).toLocaleString("default", {
            month: "short",
            day: "2-digit",
            year: "numeric"
          })}`}
        />
      )}
      <span className="past-games__item__text">{answer.words.join(" ")}</span>
      <span className="past-games__item__timestamp">
        {toRelevantTimeString(timestamp)}
      </span>
    </li>
  );
};
