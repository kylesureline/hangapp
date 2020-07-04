// istanbul ignore file

import React from "react";
import { Provider } from "react-redux";
import { Database } from "./Database";

export const StoreProvider = ({ store, children }) => (
  <Provider store={store}>
    <Database>{children}</Database>
  </Provider>
);
