import React from 'react';
import { connect } from 'react-redux';

export class Answer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const wordArray = this.props.player.answer.word.split('');
    const guessedWord = this.props.player.guessedWord;
    return (
      <div>
        <h2>{wordArray.map((letter, index) => {
          return wordArray[index] === guessedWord[index] ? (
            <span key={index}>{wordArray[index]}</span>
          ) : (
            <span key={index}>_</span>
          )
        })}</h2>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  player: state.player
});

export default connect(mapStateToProps)(Answer);
