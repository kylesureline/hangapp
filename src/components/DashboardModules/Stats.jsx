import React from 'react';
import { connect } from 'react-redux';

export const Stats = (props) => (
  <div>
    <h3 className="module__title">Stats</h3>
    <div className="stats__group">
      <p>Wins: {props.stats.wins}</p>
      <p>Losses: {props.stats.losses}</p>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  stats: state.player.stats
});

export default connect(mapStateToProps)(Stats);
