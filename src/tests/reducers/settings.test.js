import settingsReducer from '../../reducers/settings';

test('should set theme to dark', () => {
  const theme = 'dark';
  const action = {
    type: 'SET_THEME',
    theme
  };
  const state = settingsReducer({}, action);
  expect(state.theme).toBe(theme);
});

test('should set theme to light', () => {
  const theme = 'light';
  const action = {
    type: 'SET_THEME',
    theme
  };
  const state = settingsReducer({ theme: 'dark' }, action);
  expect(state.theme).toBe(theme);
});

test('should open sidebar', () => {
  const isOpen = true;
  const action = {
    type: 'OPEN_SIDEBAR',
    isOpen
  };
  const state = settingsReducer({}, action);
  expect(state.isOpen).toBe(isOpen);
});

test('should close sidebar', () => {
  const isOpen = false;
  const action = {
    type: 'CLOSE_SIDEBAR',
    isOpen
  };
  const state = settingsReducer({ isOpen: true }, action);
  expect(state.isOpen).toBe(isOpen);
});
