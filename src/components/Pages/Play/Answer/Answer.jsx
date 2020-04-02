import React from "react";
import { Word } from "./Word";
import { useSelector } from "react-redux";
import { Hint } from "./Hint";

export const Answer = () => {
  const { progress, answer, isOver } = useSelector(state => state.game);
  const { dictionary } = useSelector(state => state.settings);

  return (
    <div className="answer">
      <h1 className="answer__value">
        {isOver
          ? answer.words.map((word, index) => <Word key={index} word={word} />)
          : progress.map((word, index) => <Word key={index} word={word} />)}
      </h1>
      <Hint dictionary={dictionary} answer={answer} isOver={isOver} />
    </div>
  );
};
