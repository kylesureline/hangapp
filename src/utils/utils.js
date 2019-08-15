export const hasLocalStorageSupport = () => {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch(e) {
    return false;
  }
};

export const isOnline = () => {
  return navigator.onLine;
};

export const checkStatus = (response) => {
  if(response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
};

export const fetchData = (url) => {
  return fetch(url)
            .then(checkStatus)
            .then(res => res.json())
            .catch(error => console.log('Looks like there was a problem', error));
};

export const hasWordsInLocalStorage = () => (!!localStorage.getItem('cachedWords'));
export const hasPastGamesInLocalStorage = () => (!!localStorage.getItem('pastGames'));

export const getWordFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem('cachedWords'));
  const word = data.pop();
  localStorage.setItem('cachedWords', JSON.stringify(data));
  return word;
};
