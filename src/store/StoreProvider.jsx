import React from 'react';
import { configureStore } from './configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

export const StoreProvider = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);
