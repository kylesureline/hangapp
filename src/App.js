import React from 'react';
import { AppRouter } from './routers/AppRouter';
import { StoreProvider } from './store/StoreProvider';

const App = () => (
  <StoreProvider>
    <AppRouter />
  </StoreProvider>
);

export default App;
