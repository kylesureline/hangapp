import React from 'react';
import { connect } from 'react-redux';
import PastWordsListItem from './PastWordsListItem.jsx';

export const PastWordsList = (props) => (
  <div className="past-games">
    {
      props.pastGames.length === 0 ? (
        <div>No past games available</div>
      ) : (
        props.pastGames.map((game, index) => {
          if(index < 10) {
            return <PastWordsListItem key={game.word} {...game} />
          }
        })
      )
    }
  </div>
);

const mapStateToProps = (state) => ({
  pastGames: state.player.pastGames || []
});

export default connect(mapStateToProps)(PastWordsList);
