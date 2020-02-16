import React, { useEffect} from 'react';
import { ReactComponent as HangmanSVG } from '../../../images/hangman.svg';
import { useSelector } from 'react-redux';

export const Hangman = () => {
  const game = useSelector(state => state.game);

  useEffect(() => {
    drawFrame(game.guessesRemaining);
  }, [game]);

  const drawFrame = guessesRemaining => {
    let frame = 10;
    svgAnimator(frame);
    while(frame >= guessesRemaining) {
      svgAnimator(frame);
      frame -= 1;
    }
  };

  const svgAnimator = (guessesRemaining) => {
    if(guessesRemaining === 10) {
  		for(let i = 0; i < 10; i += 1) {
  			let path = document.querySelector('#svg_' + i);
  			let length = path.getTotalLength();
  			// Clear any previous transition
  			path.style.transition = path.style.WebkitTransition =
  			  'none';
  			// Set up the starting positions
  			path.style.strokeDasharray = length + ' ' + length;
  			path.style.strokeDashoffset = '0';
  			// Trigger a layout so styles are calculated & the browser
  			// picks up the starting position before animating
  			path.getBoundingClientRect();
  			// Define our transition
  			path.style.transition = path.style.WebkitTransition =
  			  'stroke-dashoffset 2s ease-in-out';
  			// Go!
  			path.style.strokeDashoffset = length;
  		}
  	} else {
  		let path = document.querySelector('#svg_' + guessesRemaining);
  		let length = path.getTotalLength();
  		// Clear any previous transition
  		path.style.transition = path.style.WebkitTransition =
  		  'none';
  		// Set up the starting positions
  		path.style.strokeDasharray = length + ' ' + length;
  		path.style.strokeDashoffset = length;
  		// Trigger a layout so styles are calculated & the browser
  		// picks up the starting position before animating
  		path.getBoundingClientRect();
  		// Define our transition
  		path.style.transition = path.style.WebkitTransition =
  		  'stroke-dashoffset 2s ease-in-out';
  		// Go!
  		path.style.strokeDashoffset = '0';
  	}
  };

  return (
    <div className="hangman-SVG">
      <HangmanSVG />
    </div>
  )
};
