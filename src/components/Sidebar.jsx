import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';

export const Sidebar = ({ isOpen, startLogout }) => (
  <div className={isOpen ? 'sidebar sidebar--open' : 'sidebar sidebar--closed'}>
    <div className="trigger-container trigger-container--close show-for-mobile">
      <div className="meat" />
      <div className="meat" />
    </div>
    <Link to="/play">Play</Link>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/about">About</Link>
    <button
      className="button button--link"
      onClick={startLogout}>
      Logout
    </button>
  </div>
);

const mapStateToProps = (state) => ({
  isOpen: state.settings.isOpen
});

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
