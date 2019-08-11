import React from 'react';
import { connect } from 'react-redux';
import { guessLetter, updateGuessedWord, wrongGuess } from '../actions/player';
import LetterGridItem from './LetterGridItem.jsx';
import { startAddWord, startAddWin, startAddLoss } from '../actions/player';

export class LetterGrid extends React.Component {
  handleGuess = (e) => {
    const letter = e.target.textContent;
    if(!this.isGuessedLetter(letter)) {
      this.props.guessLetter(letter);
      this.checkWord(letter);
    }
  };
  isGuessedLetter = (letter) => {
    const guessedLetters = this.props.player.guessedLetters;
    if(guessedLetters.indexOf(letter) === -1) {
      return false;
    }
    return true;
  };
  checkWord = (letter) => {
    const answer = this.props.player.answer.word;
    const guessedWord = this.props.player.guessedWord;
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
    if(answer === guessedWord.join('') && this.props.player.guessesRemaining > 0) {
      this.props.startAddWin();
      this.props.startAddWord(this.props.player.answer);
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
  player: state.player
});

const mapDispatchToProps = (dispatch) => ({
  guessLetter: (letter) => dispatch(guessLetter(letter)),
  updateGuessedWord: (guessedWord) => dispatch(updateGuessedWord(guessedWord)),
  wrongGuess: () => dispatch(wrongGuess()),
  startAddWord: (answer) => dispatch(startAddWord(answer)),
  startAddWin: () => dispatch(startAddWin()),
  startAddLoss: () => dispatch(startAddLoss())
});

export default connect(mapStateToProps, mapDispatchToProps)(LetterGrid);
