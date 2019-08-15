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
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        isOpen: !state.isOpen
      }
    default:
      return state;
  }
};
