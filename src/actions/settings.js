export const setTheme = (theme) => ({
  type: 'SET_THEME',
  theme
});

export const openSidebar = () => ({
  type: 'OPEN_SIDEBAR',
  isOpen: true
});

export const closeSidebar = () => ({
  type: 'CLOSE_SIDEBAR',
  isOpen: false  
});
