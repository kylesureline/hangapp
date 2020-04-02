import React from "react";

export const Word = ({ word }) => (
  <span className="word">
    {word.split("").map((letter, index) => (
      <span key={index} className="word__letter">
        {letter}
      </span>
    ))}
  </span>
);
