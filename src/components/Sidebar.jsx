import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { closeSidebar } from '../actions/settings';

export const Sidebar = ({ isOpen, startLogout, closeSidebar }) => (
  <div className={isOpen ? 'sidebar sidebar--open' : 'sidebar sidebar--closed'}>
    <nav className="nav">
      <NavLink to="/play" activeClassName="is-active" className="nav__item" onClick={closeSidebar}>Play</NavLink>
      <NavLink to="/dashboard" activeClassName="is-active" className="nav__item" onClick={closeSidebar}>Dashboard</NavLink>
      <NavLink to="/about" activeClassName="is-active" className="nav__item" onClick={closeSidebar}>About</NavLink>
      <button
        className="nav__item"
        onClick={startLogout}>
        Logout
      </button>
    </nav>
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
