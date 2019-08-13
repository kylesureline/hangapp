import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { startSetPlayer } from '../actions/player';

export const EndGameModal = ({ guessedWord, startSetPlayer, answer, guessesRemaining }) => {
  Modal.setAppElement('#app');
  return (
    <Modal
      isOpen={guessesRemaining <= 0 || answer.word === guessedWord}
      onRequestClose={startSetPlayer}
      contentLabel="Game over!"
      className="modal"
    >
      <h3 className="modal__title">Game over!</h3>
      <p className="modal__body">You {
        answer.word === guessedWord ? 'won' : 'lost'
      }!</p>
      <p className="modal__body">{answer.word}, {answer.type}, {answer.def}</p>
      <button className="button" onClick={startSetPlayer}>Play again?</button>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  guessedWord: state.player.guessedWord.join(''),
  guessesRemaining: state.player.guessesRemaining,
  answer: state.player.answer
});

const mapDispatchToProps = (dispatch) => ({
  startSetPlayer: () => dispatch(startSetPlayer())
});

export default connect(mapStateToProps, mapDispatchToProps)(EndGameModal);
