import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Navigation } from "../components/Navigation";
// pages
import { Play } from "../components/Pages/Play/Play";
import { Database } from "../components/Pages/Database/Database";
import { Settings } from "../components/Pages/Settings/Settings";
import { Stats } from "../components/Pages/Stats/Stats";
import { NotFound } from "../components/Pages/NotFound";

export const AppRouter = () => (
  <HashRouter>
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

      {/* SETTINGS */}
      <Route path="/stats">
        <Stats />
      </Route>

      <Route>
        <NotFound />
      </Route>
    </Switch>
  </HashRouter>
);
