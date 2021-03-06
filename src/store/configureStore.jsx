// istanbul ignore file

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// reducers
import { reducer as settings } from "../reducers/settings";
import { reducer as game } from "../reducers/game";
import { reducer as db } from "../reducers/db";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
  const store = createStore(
    combineReducers({
      settings,
      game,
      db
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
