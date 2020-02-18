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

export const getCache = () => JSON.parse(localStorage.getItem('db')) || [];

export const addToCache = word => {
  const cache = getCache();
  localStorage.setItem('db', JSON.stringify([...cache, word]));
};

export const getWordFromCache = () => {
  const cache = [...getCache()];
  const word = cache.shift();
  localStorage.setItem('db', JSON.stringify([...cache]));

  return word;
};
