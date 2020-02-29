import React from 'react';

export const Hint = ({ mode, dictionary, answer, isOver }) => {
  const { showDefinition, showWordType } = dictionary;
  if(mode === 'dictionary') {
    const { def, wordType } = answer;
    return (
      <h2 className="answer__hint">
        {(showDefinition || isOver) && <span className="answer__hint__definition">{def}</span>}
        {(showWordType || isOver) && <span className="answer__hint__word-type">{wordType}</span>}
      </h2>
    )
  } else {
    return '';
  }
};
