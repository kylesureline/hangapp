import React from 'react';
import HangmanSVG from './HangmanSVG.jsx';
import LetterGrid from './LetterGrid.jsx';
import Answer from './Answer.jsx';

export const GamePage = () => {
  return (
    <div>
      <HangmanSVG />
      <Answer/>
      <LetterGrid />
    </div>
  );
};

export default GamePage;
