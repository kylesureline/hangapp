import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import HomePage from '../components/HomePage.jsx';
import LoginPage from '../components/LoginPage.jsx';
import SignupPage from '../components/SignupPage.jsx';
import GamePage from '../components/GamePage.jsx';
import DashboardPage from '../components/DashboardPage.jsx';
import AboutPage from '../components/AboutPage.jsx';
import NotFoundPage from '../components/NotFoundPage.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import PublicRoute from './PublicRoute.jsx';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={HomePage} exact={true} />
        <PublicRoute path="/login" component={LoginPage} />
        <PublicRoute path="/signup" component={SignupPage} />
        <PrivateRoute path="/play" component={GamePage} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/about" component={AboutPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
