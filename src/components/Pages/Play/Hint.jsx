import React from 'react';

export const Hint = ({ mode, wordsSettings, answer, isOver }) => {
  const { showDefinition, showWordType } = wordsSettings;
  if(mode === 'words') {
    const { def, wordType } = answer;
    return (
      <h2 className="answer__hint">
        {showDefinition || isOver && <span className="answer__hint__definition">{def}</span>}
        {showWordType || isOver && <span className="answer__hint__word-type">{wordType}</span>}
      </h2>
    )
  } else {
    return '';
  }
};
