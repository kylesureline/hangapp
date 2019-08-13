const defaultSettingsState = {
  theme: 'light'
}

export default (state = defaultSettingsState, action) => {
  switch(action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.theme
      };
    default:
      return state;
  }
};
