import React from 'react';
import { connect } from 'react-redux';

export class HangmanSVG extends React.Component {
  componentDidMount() {
    this.drawFrame(this.props.guessesRemaining);
  }
  componentDidUpdate() {
    this.svgAnimator(this.props.guessesRemaining);
  }
  drawFrame = (guessesRemaining) => {
    let frame = 10;
    this.svgAnimator(frame);
    while(frame >= guessesRemaining) {
      this.svgAnimator(frame);
      frame -= 1;
    }
  };
  svgAnimator = (guessesRemaining) => {
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
  render() {
    return (
      <div className="hangman-SVG">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <g>
            <rect fill="#fff" id="canvas_background" height="200" width="200" y="0" x="0"/>
            <g display="none" overflow="visible" y="0" x="0" height="100%" width="100%" id="canvasGrid">
              <rect fill="url(#gridpattern)" strokeWidth="0" y="0" x="0" height="100%" width="100%"/>
            </g>
            <rect id="canvas_border" width="200" height="200" fill="rgba(0, 0, 0, 0)" strokeWidth="2" stroke="#000" />
          </g>
          <g>
            <path className="hangman-draw" id="svg_9" d="m21.16667,179.33333l159.00905,0" strokeWidth="3" stroke="#000" fill="none"/>
            <path className="hangman-draw" id="svg_8" d="m126.83334,179l0,-160.00939" strokeWidth="3" stroke="#000" fill="none"/>
            <path className="hangman-draw" id="svg_7" d="m128.16667,20.33333l-73.33637,0" strokeWidth="3" stroke="#000" fill="none"/>
            <path className="hangman-draw" id="svg_6" d="m56.33333,18.91667l0,27.35162" strokeWidth="3" stroke="#000" fill="none"/>
            <path className="hangman-draw" id="svg_5" d="m41.375,61.125c0,-8.21823 6.65677,-14.875 14.875,-14.875c8.21823,0 14.875,6.65677 14.875,14.875c0,8.21823 -6.65677,14.875 -14.875,14.875c-8.21823,0 -14.875,-6.65677 -14.875,-14.875z" strokeWidth="3" stroke="#000" fill="none"/>
            <path className="hangman-draw" id="svg_4" d="m56.125,76.75l0,58.29344" strokeWidth="3" stroke="#000" fill="none"/>
            <path className="hangman-draw" id="svg_3" d="m56.125,133.75l-19.87225,19.87225" strokeWidth="3" stroke="#000" fill="none"/>
            <path className="hangman-draw" id="svg_2" d="m56.875,133.75l19.44302,19.44302" strokeWidth="3" stroke="#000" fill="none"/>
            <path className="hangman-draw" id="svg_1" d="m56.375,77l-19.87225,19.87225" strokeWidth="3" stroke="#000" fill="none"/>
            <path className="hangman-draw" id="svg_0" d="m55.625,77l19.44302,19.44302" strokeWidth="3" stroke="#000" fill="none"/>
          </g>
        </svg>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  guessesRemaining: state.player.guessesRemaining
});

export default connect(mapStateToProps)(HangmanSVG);
