import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Navigation } from '../components/Navigation';
import { LoadingIndicator } from '../components/LoadingIndicator';
// pages
import { Play } from '../components/Pages/Play/Play';
import { Database } from '../components/Pages/Database/Database';
import { Settings } from '../components/Pages/Settings/Settings';
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

      {/* DATABASE */}
      <Route path="/database">
        <Database />
      </Route>

      {/* SETTINGS */}
      <Route path="/settings">
        <Settings />
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
    {/* <div>Modal</div> */}
    <LoadingIndicator />
  </Router>
);
