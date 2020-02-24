export const NEW_GAME = answer => ({
  type: 'NEW_GAME',
  answer
});

export const ADD_WORD_WITH_DEF = word => ({
  type: 'ADD_WORD_WITH_DEF',
  word
});

export const UPDATE_WORDS_WITH_DEF = withDef => ({
  type: 'UPDATE_WORDS_WITH_DEF',
  withDef
});

export const CHANGE_MODE = mode => ({
  type: 'CHANGE_MODE',
  mode
});

export const CHANGE_WORDS_SETTINGS = settings => ({
  type: 'CHANGE_WORDS_SETTINGS',
  settings: {
    ...settings
  },
});

export const GUESS_LETTER = letter => ({
  type: 'GUESS_LETTER',
  letter
});

export const END_GAME = () => ({
  type: 'END_GAME',
});

export const SAVE_GAME = (won, mode, categories) => ({
  type: 'SAVE_GAME',
  won,
  mode,
  categories
});
