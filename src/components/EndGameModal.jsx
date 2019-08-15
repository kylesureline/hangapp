import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { startAddWin, startAddLoss, startAddWord, chooseRandomWord } from '../actions/player';

export class EndGameModal extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClose = () => {
    const guessedWord = this.props.guessedWord;
    const guessesRemaining = this.props.guessesRemaining;
    const answer = this.props.answer;
    if(answer.word === guessedWord && guessesRemaining > 0) {
      this.props.startAddWin();
      this.props.startAddWord({...answer, won: true});
    } else if(guessesRemaining <= 0) {
      this.props.startAddLoss();
      this.props.startAddWord({...answer, won: false});
    }
    this.props.chooseRandomWord();
  };
  render() {
    const guessedWord = this.props.guessedWord;
    const guessesRemaining = this.props.guessesRemaining;
    const answer = this.props.answer;
    Modal.setAppElement('#app');
    return (
      <Modal
        isOpen={guessesRemaining <= 0 || answer.word === guessedWord}
        onRequestClose={this.handleClose}
        contentLabel="Game over!"
        className="modal"
      >
        <h3 className="modal__title">Game over!</h3>
        <p className="modal__body">You {
          answer.word === guessedWord ? 'won' : 'lost'
        }! The word was...</p>
        <p className="modal__body">
          {answer.word === 'hangapp' ? (
            <a className="link" href={'#'}>{answer.word}</a>
          ) : (
            <a className="link" href={`https://www.merriam-webster.com/dictionary/${answer.word}/`} target="_blank">
              {answer.word}
            </a>
          )}
          <span className="modal__body modal__body--word-type">({answer.type})</span>
        </p>
        <p className="modal__body modal__body--def">{answer.def}</p>
        <button className="button" onClick={this.handleClose}>Play again?</button>
      </Modal>
    );
  }
};

const mapStateToProps = (state) => ({
  guessedWord: state.player.guessedWord.join(''),
  guessesRemaining: state.player.guessesRemaining,
  answer: state.player.answer
});

const mapDispatchToProps = (dispatch) => ({
  startAddWin: () => dispatch(startAddWin()),
  startAddLoss: () => dispatch(startAddLoss()),
  startAddWord: (answer) => dispatch(startAddWord(answer)),
  chooseRandomWord: () => dispatch(chooseRandomWord())
});

export default connect(mapStateToProps, mapDispatchToProps)(EndGameModal);
