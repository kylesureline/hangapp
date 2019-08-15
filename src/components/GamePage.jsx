import React from 'react';
import HangmanSVG from './HangmanSVG.jsx';
import LetterGrid from './LetterGrid.jsx';
import Answer from './Answer.jsx';
import EndGameModal from './EndGameModal.jsx';

export const GamePage = () => {
  return (
    <div className="page page--game">
      <HangmanSVG />
      <Answer/>
      <LetterGrid />
      <EndGameModal />
    </div>
  );
};

export default GamePage;
