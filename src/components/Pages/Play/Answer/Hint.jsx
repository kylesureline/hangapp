import React from "react";

export const Hint = ({ dictionary, answer, isOver }) => {
  const { showDefinition, showWordType } = dictionary;
  if (!answer.category) {
    // only the dictionary word object will not have a category set
    const { def, wordType } = answer;
    return (
      <h2 className="answer__hint">
        {(showDefinition || isOver) && (
          <span className="answer__hint__definition">{def}</span>
        )}
        {(showWordType || isOver) && (
          <span className="answer__hint__word-type">{wordType}</span>
        )}
      </h2>
    );
  } else if (answer.category === "recipe") {
    return (
      <h2 className="answer__hint">
        <span className="answer__hint__definition">
          {answer.tags.join(" ")}
        </span>
        <span className="answer__hint__word-type">{answer.category}</span>
      </h2>
    );
  } else if (answer.category === "dog") {
    return (
      <h2 className="answer__hint">
        <span className="answer__hint__definition">{answer.bredFor}</span>
        <span className="answer__hint__word-type">{answer.category}</span>
      </h2>
    );
  } else if (answer.category === "cat") {
    return (
      <h2 className="answer__hint">
        <span className="answer__hint__definition">{answer.temperament}</span>
        <span className="answer__hint__word-type">{answer.category}</span>
      </h2>
    );
  } else {
    return "";
  }
};
