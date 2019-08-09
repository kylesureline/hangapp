import React from 'react';
import { connect } from 'react-redux';
import HangmanSVG from './HangmanSVG.jsx';
import LetterGrid from './LetterGrid.jsx';
import Answer from './Answer.jsx';

export class GamePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: {
        word: 'hangapp',
        type: 'noun',
        def: 'A Hangman game built as a React web app by Kyle Scheuerlein'
      },
      guessedLetters: [],
      guessedWord: [],
      guessed: 10
    }
  }
  render() {
    return (
      <div>
        <HangmanSVG />
        <Answer answer={this.state.answer.word}/>
        <LetterGrid />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  settings: state.settings
})

export default connect(mapStateToProps)(GamePage);
