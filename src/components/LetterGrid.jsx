import React from 'react';
import { connect } from 'react-redux';
import { guessLetter, updateGuessedWord, wrongGuess } from '../actions/game';
import LetterGridItem from './LetterGridItem.jsx';

export class LetterGrid extends React.Component {
  handleGuess = (e) => {
    const letter = e.target.textContent;
    if(!this.isGuessedLetter(letter)) {
      this.props.guessLetter(letter);
      this.checkWord(letter);
    }
  };
  isGuessedLetter = (letter) => {
    const guessedLetters = this.props.game.guessedLetters;
    if(guessedLetters.indexOf(letter) === -1) {
      return false;
    }
    return true;
  };
  checkWord = (letter) => {
    const answer = this.props.game.answer.word;
    const guessedWord = this.props.game.guessedWord;
    let wrong = 0;
    for(let i = 0; i < answer.length; i++) {
      if(letter === answer[i]) {
        guessedWord[i] = letter;
        this.props.updateGuessedWord(guessedWord);
      } else {
        wrong++;
      }
    }
    if(wrong === answer.length) {
      this.props.wrongGuess();
    }
  };
  render() {
    return (
      <div>
        {
          'abcdefghijklmnopqrstuvwxy'.split('').map((letter) => {
            return <LetterGridItem key={letter} letter={letter} handleGuess={this.handleGuess} />;
          })
        }
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  game: state.game
});

const mapDispatchToProps = (dispatch) => ({
  guessLetter: (letter) => dispatch(guessLetter(letter)),
  updateGuessedWord: (guessedWord) => dispatch(updateGuessedWord(guessedWord)),
  wrongGuess: () => dispatch(wrongGuess())
});

export default connect(mapStateToProps, mapDispatchToProps)(LetterGrid);
