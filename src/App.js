import React from 'react';
import { AppRouter } from './routers/AppRouter';
import { StoreProvider } from './store/StoreProvider';
import { configureStore } from './store/configureStore';

const store = configureStore();

const App = () => (
  <StoreProvider store={store}>
    <AppRouter />
  </StoreProvider>
);

export default App;
