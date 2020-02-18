export const ADD_WORDS = chunk => ({
  type: 'ADD_WORDS',
  chunk
});

export const DONE_COMPILING = () => ({
  type: 'DONE_COMPILING',
})

export const NEW_GAME = answer => ({
  type: 'NEW_GAME',
  answer
});
