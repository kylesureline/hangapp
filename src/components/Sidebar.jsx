import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { closeSidebar } from '../actions/settings';

export const Sidebar = ({ isOpen, startLogout, closeSidebar }) => (
  <div className={isOpen ? 'sidebar sidebar--open' : 'sidebar sidebar--closed'}>
    <div
      className="trigger-container trigger-container--close show-for-mobile"
      onClick={closeSidebar}>
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
  startLogout: () => dispatch(startLogout()),
  closeSidebar: () => dispatch(closeSidebar())
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
