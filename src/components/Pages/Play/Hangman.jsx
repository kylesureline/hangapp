import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Hangman = () => {
  const { guessesRemaining } = useSelector(state => state.game);
  const pathGroupRef = useRef(null);

  useEffect(() => {
    if(!!pathGroupRef.current) {
      const paths = pathGroupRef.current.querySelectorAll('.hangman-draw');
      paths.forEach((path, index) => {
        const length = path.getTotalLength();
        const num = path.id.replace(/[^0-9]+/g, '');
        path.style.strokeDasharray = `${length}px ${length}px`;
        path.getBoundingClientRect();
  			path.style.transition = path.style.WebkitTransition =
  			  'stroke-dashoffset 2s ease-in-out';
        if(num < guessesRemaining) {
          path.style.strokeDashoffset = length;
        }
        else path.style.strokeDashoffset = '0';
      });
    }
  }, [guessesRemaining, pathGroupRef]);

  return (
    <div className="hangman">
      {/* <HangmanSVG title={`Guesses remaining: ${guessesRemaining}`} /> */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <g>
          <rect fill="#fff" id="canvas_background" height="200" width="200" y="0" x="0"/>
          <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
            <rect fill="url(#gridpattern)" strokeWidth="0" y="0" x="0" height="100%" width="100%"/>
          </g>
        </g>
        <g ref={pathGroupRef}>
          <path className="hangman-draw" id="svg_9" d="m21.16667,179.33333l159.00905,0" strokeWidth="3" fill="none"/>
          <path className="hangman-draw" id="svg_8" d="m126.83334,179l0,-160.00939" strokeWidth="3" fill="none"/>
          <path className="hangman-draw" id="svg_7" d="m128.16667,20.33333l-73.33637,0" strokeWidth="3" fill="none"/>
          <path className="hangman-draw" id="svg_6" d="m56.33333,18.91667l0,27.35162" strokeWidth="3" fill="none"/>
          <path className="hangman-draw" id="svg_5" d="m41.375,61.125c0,-8.21823 6.65677,-14.875 14.875,-14.875c8.21823,0 14.875,6.65677 14.875,14.875c0,8.21823 -6.65677,14.875 -14.875,14.875c-8.21823,0 -14.875,-6.65677 -14.875,-14.875z" strokeWidth="3" fill="none"/>
          <path className="hangman-draw" id="svg_4" d="m56.125,76.75l0,58.29344" strokeWidth="3" fill="none"/>
          <path className="hangman-draw" id="svg_3" d="m56.125,133.75l-19.87225,19.87225" strokeWidth="3" fill="none"/>
          <path className="hangman-draw" id="svg_2" d="m56.875,133.75l19.44302,19.44302" strokeWidth="3" fill="none"/>
          <path className="hangman-draw" id="svg_1" d="m56.375,77l-19.87225,19.87225" strokeWidth="3" fill="none"/>
          <path className="hangman-draw" id="svg_0" d="m55.625,77l19.44302,19.44302" strokeWidth="3" fill="none"/>
        </g>
      </svg>

    </div>
  )
};
