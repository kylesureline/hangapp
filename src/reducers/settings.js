const defaultSettingsState = {
  theme: 'light',
  isOpen: false
};

export default (state = defaultSettingsState, action) => {
  switch(action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.theme
      };
    case 'OPEN_SIDEBAR':
      return {
        ...state,
        isOpen: action.isOpen
      };
    case 'CLOSE_SIDEBAR':
      return {
        ...state,
        isOpen: action.isOpen
      };
    default:
      return state;
  }
};
