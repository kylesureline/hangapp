import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Header } from '../components/Header';
// pages
import { Game } from '../components/Pages/Game/Game';

export const history = createBrowserHistory();

export const AppRouter = () => (
  <Router history={history}>
    <Sidebar />
    <Header />
    <Switch>
      <Route path="/" exact={true}>
        <Game />
      </Route>
    </Switch>
    {/* <div>Modal</div> */}
  </Router>
);
