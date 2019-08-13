import React from 'react';
import { connect } from 'react-redux';

export const Answer = ({ word, type, player }) => {
  const guessedWord = player.guessedWord;
  const wordArray = word.split('');
  return (
    <div className="answer">
      <h2>{wordArray.map((letter, index) => {
        return wordArray[index] === guessedWord[index] ? (
          <span key={index}>{wordArray[index]}</span>
        ) : (
          <span key={index}>_</span>
        )
      })}</h2>
      <p>{!!type ? type : 'No word type available'}</p>
    </div>
  );
};
const mapStateToProps = (state) => ({
  word: state.player.answer.word,
  type: state.player.answer.type,
  player: state.player
});

export default connect(mapStateToProps)(Answer);
