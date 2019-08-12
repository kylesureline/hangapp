import React from 'react';
import { connect } from 'react-redux';

export const Answer = ({ player }) => {
  const wordArray = player.answer.word.split('');
  return (
    <div>
      <h2>{wordArray.map((letter, index) => {
        return wordArray[index] === player.guessedWord[index] ? (
          <span key={index}>{wordArray[index]}</span>
        ) : (
          <span key={index}>_</span>
        )
      })}</h2>
    </div>
  );
};
const mapStateToProps = (state) => ({
  player: state.player
});

export default connect(mapStateToProps)(Answer);
