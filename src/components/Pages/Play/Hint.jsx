import React from 'react';

export const Hint = ({ mode, words, answer }) => {
  if(mode === 'words') {
    return (
      <h2 className="answer__hint">
        {words.showDefinition && <span>{answer.def}</span>}
        {words.showWordType && <span>{answer.wordType}</span>}
      </h2>
    )
  } else {
    return '';
  }
};
