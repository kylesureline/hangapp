import React from 'react';
import { Word } from '../../reusable/Word';
import { useSelector } from 'react-redux';

export const Answer = () => {
  const { progress } = useSelector(state => state.game);

  return (
    <div className="answer">
      <h1>{progress.map((word, index) => <Word key={index} word={word} />)}</h1>
    </div>
  );
};
