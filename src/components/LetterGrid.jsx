import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { guessLetter, updateGuessedWord, wrongGuess } from '../actions/player';
import LetterGridItem from './LetterGridItem.jsx';
import { startAddWord, startAddWin, startAddLoss } from '../actions/player';

export class LetterGrid extends React.Component {
  constructor(props) {
    super(props);
  }
  handleGuess = (e) => {
    const letter = e.target.textContent;
    if(!this.isGuessedLetter(letter)) {
      this.props.guessLetter(letter);
      this.checkWord(letter);
    }
  };
  handleKeyPress = (letter) => {
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
    let guessesRemaining = this.props.player.guessesRemaining;
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
      // guessesRemaining--;
    }
    // if(answer === guessedWord.join('') && guessesRemaining > 0) {
    //   this.props.startAddWin();
    //   this.props.startAddWord({...this.props.player.answer, won: true});
    // } else if(guessesRemaining <= 0) {
    //   this.props.startAddLoss();
    //   this.props.startAddWord({...this.props.player.answer, won: false});
    // }
  };
  render() {
    return (
      <div className="letter-grid">
        {
          'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => {
            return <LetterGridItem
                      key={letter}
                      letter={letter}
                      handleGuess={this.handleGuess}
                      handleKeyPress={this.handleKeyPress}
                    />;
          })
        }
        <KeyboardEventHandler
          handleKeys={'abcdefghijklmnopqrstuvwxyz'.split('')}
          onKeyEvent={this.handleKeyPress}
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  player: state.player
  // answer: state.player.answer,
  // guessedLetters: state.player.guessedLetters,
  // guessesRemaining: state.player.guessesRemaining,
  // guessedWord: state.player.guessedWord
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
