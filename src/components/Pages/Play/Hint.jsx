import React from 'react';

export const Hint = ({ mode, word, answer }) => {
  if(mode === 'word') {
    return (
      <h2 className="answer__hint">
        {word.showDefinition && <span>{answer.definition}</span>}
        {word.showWordType && <span>{answer.wordType}</span>}
      </h2>
    )
  } else {
    return '';
  }
};
