import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { openSidebar } from '../actions/settings';

export const Header = ({ openSidebar }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/play">
          <h1>Hangapp</h1>
        </Link>
        <div className="trigger-container trigger-container--open show-for-mobile" onClick={openSidebar}>
          <div className="meat" />
          <div className="meat" />
          <div className="meat" />
        </div>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
  openSidebar: () => dispatch(openSidebar())
});

export default connect(undefined, mapDispatchToProps)(Header);
