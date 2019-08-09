import React from 'react';
import { connect } from 'react-redux';


const GamePage = (props) => (
  <div>
    Game page
  </div>
);

const mapStateToProps = (state) => ({
  settings: state.settings
})

export default connect(mapStateToProps)(GamePage);
