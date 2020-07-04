export const saveToLS = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));
