import React from 'react';
import { ReactComponent as HangmanSVG } from '../../../images/hangman.svg';

export const Game = () => (
  <main className="game-screen">
    <div className="input">
      <HangmanSVG />
      <h2></h2>
      <span className="hint"></span>
      <div className="letters">
        <button>A</button>
        <button>B</button>
        <button>C</button>
        <button>D</button>
        <button>E</button>
        <button>F</button>
        <button>G</button>
        <button>H</button>
        <button>I</button>
        <button>J</button>
        <button>K</button>
        <button>L</button>
        <button>M</button>
        <button>N</button>
        <button>O</button>
        <button>P</button>
        <button>Q</button>
        <button>R</button>
        <button>S</button>
        <button>T</button>
        <button>U</button>
        <button>V</button>
        <button>W</button>
        <button>X</button>
        <button>Y</button>
        <button>Z</button>
      </div>
    </div>
    <div className="instructions">
      <h3>Keyboard Controls</h3>
      <div className="left">
        <p>a-z</p>
        <p>Enter or N</p>
        <p>D</p>
        <p>L</p>
        <p>E</p>
        <p>M</p>
        <p>H</p>
      </div>
      <div className="right">
        <p>Guess</p>
        <p>New Game</p>
        <p>Dark Theme</p>
        <p>Light Theme</p>
        <p>Easy Difficulty</p>
        <p>Medium Difficulty</p>
        <p>Hard Difficulty</p>
      </div>
    </div>
  </main>
);
