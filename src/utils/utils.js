export const fetchData = (url) => {
  const checkStatus = (response) => {
    if(response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  return fetch(url)
            .then(checkStatus)
            .then(res => res.json())
            .catch(error => console.log('Looks like there was a problem', error));
};

export const isOnline = () => navigator.onLine;

export const getFromLS = (key) => JSON.parse(localStorage.getItem(key));

export const saveToLS = (key, value) => localStorage.setItem(key, JSON.stringify(value));

// export const addToCache = word => {
//   const cache = getFromLS();
//   localStorage.setItem('db', JSON.stringify([...cache, word]));
// };

// export const getWordFromCache = () => {
//   const cache = [...getFromLS()];
//   const word = cache.shift();
//   localStorage.setItem('db', JSON.stringify([...cache]));
//
//   return word;
// };

export const formatWordObj = (word, wordType = '', def = '') => ({
  words: [word],
  wordType,
  def
});

export const numberWithCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const savePastGame = game => {
  const pastGames = [game, ...getFromLS('past-games') || []].slice(0, 1000);
  saveToLS('past-games', pastGames);
};

export const saveCurrentGame = state => saveToLS('current-game', state);

export const getCurrentGame = () => getFromLS('current-game');
