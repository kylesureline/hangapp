import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { startSetPlayer } from '../actions/player';

const EndGameModal = (props) => {
  const guessesRemaining = props.player.guessesRemaining;
  const answer = props.player.answer;
  const guessedWord = props.player.guessedWord.join('');
  Modal.setAppElement('#app');
  return (
    <Modal
      isOpen={guessesRemaining <= 0 || answer.word === guessedWord}
      onRequestClose={props.startSetPlayer}
      contentLabel="Game over!"
      className="modal"
    >
      <h3 className="modal__title">Game over!</h3>
      <p className="modal__body">You {
        answer.word === guessedWord ? 'won' : 'lost'
      }!</p>
      <p className="modal__body">{answer.word}, {answer.type}, {answer.def}</p>
      <button className="button" onClick={props.startSetPlayer}>Play again?</button>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  player: state.player
});

const mapDispatchToProps = (dispatch) => ({
  startSetPlayer: () => dispatch(startSetPlayer())
});

export default connect(mapStateToProps, mapDispatchToProps)(EndGameModal);
