import React from 'react';

export const Hint = ({ mode, wordsSettings, answer }) => {
  const { showDefinition, showWordType } = wordsSettings;
  if(mode === 'words') {
    const { def, wordType } = answer;
    return (
      <h2 className="answer__hint">
        {showDefinition && <span className="answer__hint__definition">{def}</span>}
        {showWordType && <span className="answer__hint__word-type">{wordType}</span>}
      </h2>
    )
  } else {
    return '';
  }
};
