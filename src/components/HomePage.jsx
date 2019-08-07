import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Hangapp</h1>
      <p>Test your knowledge!</p>
      <div className="input-group input-group--centered-column">
        <Link className="button input-group__item input-group__item--column" to="/about">About</Link>
        <Link className="button input-group__item input-group__item--column" to="/login">Login</Link>
        <Link className="button button--secondary input-group__item input-group__item--column" to="/signup">Signup</Link>
      </div>
    </div>
  </div>
);

export default HomePage;
