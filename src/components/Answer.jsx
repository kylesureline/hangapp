import React from 'react';
import { connect } from 'react-redux';

export const Answer = ({ player }) => {
  const wordArray = player.answer.word.split('');
  return (
    <div className="answer">
      <h2>{wordArray.map((letter, index) => {
        return wordArray[index] === player.guessedWord[index] ? (
          <span key={index}>{wordArray[index]}</span>
        ) : (
          <span key={index}>_</span>
        )
      })}</h2>
      <p>{!!player.answer.type ? player.answer.type : 'No word type available'}</p>
    </div>
  );
};
const mapStateToProps = (state) => ({
  player: state.player
});

export default connect(mapStateToProps)(Answer);
