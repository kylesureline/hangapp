import React from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// reducers
import { reducer as pastGames } from '../reducers/pastGames';
import { reducer as settings } from '../reducers/settings';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
  const store = createStore(
    combineReducers({
      pastGames,
      settings
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
