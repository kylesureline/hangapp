import React from 'react';
import { configureStore } from './configureStore';
import { Provider } from 'react-redux';
import { Database } from './Database';

const store = configureStore();

export const StoreProvider = ({ children }) => (
  <Provider store={store}>
    <Database>
      {children}
    </Database>
  </Provider>
);
