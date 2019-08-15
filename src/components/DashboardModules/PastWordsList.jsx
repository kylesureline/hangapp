import React from 'react';
import { connect } from 'react-redux';
import PastWordsListItem from './PastWordsListItem.jsx';

export const PastWordsList = (props) => (
  <div className="past-games">
    <div className="list-header">
      <div>Word</div>
      <div className="show-for-desktop">Date</div>
    </div>
    {
      props.pastGames.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No past games available</span>
        </div>
      ) : (
        props.pastGames.sort((a, b) => {
          return b.playedAt - a.playedAt;
        }).map((game, index) => {
          if(index < 10) {
            return <PastWordsListItem key={game.playedAt} {...game} />
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
