import React from 'react';
import { connect } from 'react-redux';

export const Stats = (props) => (
  <div>
    <h3>Stats</h3>
    <p>Wins: {props.stats.wins}</p>
    <p>Losses: {props.stats.losses}</p>
  </div>
);

const mapStateToProps = (state) => ({
  stats: state.player.stats
});

export default connect(mapStateToProps)(Stats);
