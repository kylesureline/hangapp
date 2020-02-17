export const initialState = {
  doneCompiling: false,
  words: [],
};

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'ADD_WORDS':
      return {
        ...state,
        doneCompiling: false,
        words: [...state.words, ...action.chunk],
      };
    case 'DONE_COMPILING':
      return {
        ...state,
        doneCompiling: true
      };
    default:
      return state;
  }
};
