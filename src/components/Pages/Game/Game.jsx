import React from 'react';

export const Game = () => (
  <main className="game-screen">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <g>
        <rect fill="#fff" id="canvas_background" height="200" width="200" y="0" x="0"/>
          <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
        <rect fill="url(#gridpattern)" stroke-width="0" y="0" x="0" height="100%" width="100%"/>
      </g>
      </g>
      <g>
        <path id="svg_9" d="m21.16667,179.33333l159.00905,0" stroke-width="3" stroke="#000" fill="none"/>
        <path id="svg_8" d="m126.83334,179l0,-160.00939" stroke-width="3" stroke="#000" fill="none"/>
        <path id="svg_7" d="m128.16667,20.33333l-73.33637,0" stroke-width="3" stroke="#000" fill="none"/>
        <path id="svg_6" d="m56.33333,18.91667l0,27.35162" stroke-width="3" stroke="#000" fill="none"/>
        <path id="svg_5" d="m41.375,61.125c0,-8.21823 6.65677,-14.875 14.875,-14.875c8.21823,0 14.875,6.65677 14.875,14.875c0,8.21823 -6.65677,14.875 -14.875,14.875c-8.21823,0 -14.875,-6.65677 -14.875,-14.875z" stroke-width="3" stroke="#000" fill="none"/>
        <path id="svg_4" d="m56.125,76.75l0,58.29344" stroke-width="3" stroke="#000" fill="none"/>
        <path id="svg_3" d="m56.125,133.75l-19.87225,19.87225" stroke-width="3" stroke="#000" fill="none"/>
        <path id="svg_2" d="m56.875,133.75l19.44302,19.44302" stroke-width="3" stroke="#000" fill="none"/>
        <path id="svg_1" d="m56.375,77l-19.87225,19.87225" stroke-width="3" stroke="#000" fill="none"/>
        <path id="svg_0" d="m55.625,77l19.44302,19.44302" stroke-width="3" stroke="#000" fill="none"/>
      </g>
    </svg>
    <div className="input">
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
