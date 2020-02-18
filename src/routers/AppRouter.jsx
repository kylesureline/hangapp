import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Navigation } from '../components/Navigation';
// pages
import { Play } from '../components/Pages/Play/Play';
import { Database } from '../components/Pages/Database/Database';
import { NotFound } from '../components/Pages/NotFound';

export const history = createBrowserHistory();

export const AppRouter = () => (
  <Router history={history}>
    <Navigation />
    <Switch>
      {/* PLAY */}
      <Route path="/" exact={true}>
        <Play />
      </Route>

      {/* PLAY */}
      <Route path="/database">
        <Database />
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
    {/* <div>Modal</div> */}
  </Router>
);
