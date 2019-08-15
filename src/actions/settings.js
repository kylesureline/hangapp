import database from '../firebase/firebase';

export const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  return {
    type: 'SET_THEME',
    theme
  }
};

export const startGetTheme = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database.ref(`players/${uid}/settings/theme`)
            .once('value')
            .then((snapshot) => {
              if(!!snapshot.val()) {
                dispatch(setTheme(snapshot.val()));
              } else {
                dispatch(setTheme('light'));
              }
            });
  };
};

export const startSetTheme = (theme) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database.ref(`players/${uid}/settings`)
            .update({ theme })
            .then(() => {
              dispatch(setTheme(theme));
            });
  };
};

export const openSidebar = () => ({
  type: 'OPEN_SIDEBAR',
  isOpen: true
});

export const closeSidebar = () => ({
  type: 'CLOSE_SIDEBAR',
  isOpen: false
});

export const toggleSidebar = () => ({
  type: 'TOGGLE_SIDEBAR'
});
