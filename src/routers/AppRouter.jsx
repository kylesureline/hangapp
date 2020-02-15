import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const AppRouter = () => (
  <Router history={history}>
    <div>Sidebar</div>
    <div>Page</div>
    <div>Modal</div>
  </Router>
);
