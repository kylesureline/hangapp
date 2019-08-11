import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter.jsx';
import configureStore from './store/configureStore';
import { startSetPlayer } from './actions/player';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import { firebase } from './firebase/firebase';
import LoadingPage from './components/LoadingPage.jsx';
import { cacheWords } from './wordBank/fetcher';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
let hasRendered = false;
const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetPlayer())
      .then(() => {
        renderApp();
        if(history.location.pathname === '/') {
          history.push('/play');
        }
      });
  } else {
    store.dispatch(logout());
    renderApp();
    history.push('/');
  }
});

cacheWords();
