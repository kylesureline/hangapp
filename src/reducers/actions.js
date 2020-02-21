export const ADD_WORDS_WITHOUT_DEF = chunk => ({
  type: 'ADD_WORDS_WITHOUT_DEF',
  chunk
});

export const DONE_COMPILING = () => ({
  type: 'DONE_COMPILING',
})

export const NEW_GAME = answer => ({
  type: 'NEW_GAME',
  answer
});

export const ADD_WORD_WITH_DEF = word => ({
  type: 'ADD_WORD_WITH_DEF',
  word
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
