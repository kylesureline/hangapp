import React from 'react';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// reducers
import { reducer as stats } from '../reducers/stats';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
  const store = createStore(
    combineReducers({
      stats
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
