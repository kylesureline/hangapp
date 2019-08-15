import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Hangapp</h1>
      <p className="box-layout__subtitle">Test your vocabulary!</p>
      <p className="box-layout__body">Hangapp is a hangman game. You can login and it will keep track of your games!</p>
      <div className="input-group input-group--centered-column">
        <Link className="button input-group__item input-group__item--column" to="/login">Login</Link>
        <Link className="button button--secondary input-group__item input-group__item--column" to="/signup">Signup</Link>
      </div>
    </div>
  </div>
);

export default HomePage;
