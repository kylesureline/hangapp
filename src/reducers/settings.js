const defaultSettingsState = {
  theme: 'light',
  difficulty: 'easy'
}

export default (state = defaultSettingsState, action) => {
  switch(action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.theme
      };
    case 'SET_DIFFICULTY':
      return {
        ...state,
        difficulty: action.difficulty
      };
    default:
      return state;
  }
};
