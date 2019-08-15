import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleSidebar } from '../actions/settings';

export const Header = ({ toggleSidebar, isOpen }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/play">
          <h1>Hangapp</h1>
        </Link>
        <div
          className={`trigger-container show-for-mobile ${isOpen ? 'trigger-container--open' : 'trigger-container--closed'}`}
          onClick={toggleSidebar}>
          <div className="meat" />
          <div className="meat" />
          <div className="meat" />
        </div>
      </div>
    </div>
  </header>
);

const mapStateToProps = (state) => ({
  isOpen: state.settings.isOpen
});

const mapDispatchToProps = (dispatch) => ({
  toggleSidebar: () => dispatch(toggleSidebar())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
