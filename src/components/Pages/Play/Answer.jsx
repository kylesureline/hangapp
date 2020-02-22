import React from 'react';
import { Word } from '../../reusable/Word';
import { useSelector } from 'react-redux';
import { Hint } from './Hint';

export const Answer = () => {
  const { progress, answer } = useSelector(state => state.game);
  const { mode, words: wordsSettings } = useSelector(state => state.settings);

  return (
    <div className="answer">
      <h1 className="answer__value">
        {progress.map((word, index) => <Word key={index} word={word} />)}
      </h1>
      <Hint mode={mode} wordsSettings={wordsSettings} answer={answer} />
    </div>
  );
};
