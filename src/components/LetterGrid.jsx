import React from 'react';
import { connect } from 'react-redux';
import { guessLetter, updateGuessedWord, wrongGuess } from '../actions/player';
import LetterGridItem from './LetterGridItem.jsx';
import { startAddWord, startAddWin, startAddLoss } from '../actions/player';
import { drawFrame, svgAnimator } from '../utils/utils';

export class LetterGrid extends React.Component {
  componentDidMount() {
    drawFrame(this.props.guessesRemaining);
  }
  handleGuess = (e) => {
    const letter = e.target.textContent;
    if(!this.isGuessedLetter(letter)) {
      this.props.guessLetter(letter);
      this.checkWord(letter);
    }
  };
  isGuessedLetter = (letter) => {
    const guessedLetters = this.props.guessedLetters;
    if(guessedLetters.indexOf(letter) === -1) {
      return false;
    }
    return true;
  };
  checkWord = (letter) => {
    const answer = this.props.answer.word;
    const guessedWord = this.props.guessedWord;
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
      svgAnimator(this.props.guessesRemaining - 1);
    }
    if(answer === guessedWord.join('') && this.props.guessesRemaining > 0) {
      this.props.startAddWin();
      this.props.startAddWord({...this.props.answer, won: true});
    }
    if((this.props.guessesRemaining - 1) <= 0) {
      this.props.startAddLoss();
      this.props.startAddWord({...this.props.answer, won: false});
    }
  };
  render() {
    return (
      <div>
        {
          'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => {
            return <LetterGridItem key={letter} letter={letter} handleGuess={this.handleGuess} />;
          })
        }
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  answer: state.player.answer,
  guessedLetters: state.player.guessedLetters,
  guessesRemaining: state.player.guessesRemaining,
  guessedWord: state.player.guessedWord
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
