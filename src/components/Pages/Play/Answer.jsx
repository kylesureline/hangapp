import React, { useCallback } from 'react';
import { Word } from '../../reusable/Word';
import { useSelector } from 'react-redux';

export const Answer = () => {
  const { progress, answer } = useSelector(state => state.game);
  const { mode, word, category } = useSelector(state => state.settings);

  const getHint = useCallback(() => {
    if(mode === 'word') {
      return (
        <>
          {word.showDefinition && <span>{answer.definition}</span>}
          {word.showWordType && <span>{answer.wordType}</span>}
        </>
      )
    }
  }, [mode, word, category]);

  return (
    <div className="answer">
      <h1 className="answer__value">
        {progress.map((word, index) => <Word key={index} word={word} />)}
      </h1>
      <h2 className="answer__hint">{getHint()}</h2>
    </div>
  );
};
