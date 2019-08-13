import { setTheme, openSidebar, closeSidebar } from '../../actions/settings';

test('should setup setTheme action object', () => {
  const theme = 'dark';
  const action = setTheme(theme);
  expect(action).toEqual({
    type: 'SET_THEME',
    theme
  });
});

test('should setup openSidebar action object', () => {
  const action = openSidebar();
  expect(action).toEqual({
    type: 'OPEN_SIDEBAR',
    isOpen: true
  });
});

test('should setup closeSidebar action object', () => {
  const action = closeSidebar();
  expect(action).toEqual({
    type: 'CLOSE_SIDEBAR',
    isOpen: false
  });
});
