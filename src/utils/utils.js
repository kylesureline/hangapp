export const fetchData = (url, opt) => {
  const checkStatus = response => {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  };

  return fetch(url, opt)
    .then(checkStatus)
    .then(res => res.json())
    .catch(error => console.log("Looks like there was a problem", error));
};

/* istanbul ignore next line */
export const isOnline = () => navigator.onLine;

export const getFromLS = key => JSON.parse(localStorage.getItem(key));

export const saveToLS = (key, value) =>
  localStorage.setItem(key, JSON.stringify(value));

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

export const formatWordObj = (word, wordType = "", def = "") => ({
  words: [word],
  wordType,
  def
});

export const numberWithCommas = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const savePastGame = game => {
  const pastGames = [game, ...(getFromLS("past-games") || [])].slice(0, 1000);
  saveToLS("past-games", pastGames);
};

export const saveCurrentGame = state => saveToLS("current-game", state);

export const getCurrentGame = () => getFromLS("current-game");

export const toHoursMinutesSeconds = valueOf => {
  const remainderOf = inMilliseconds => {
    const result = (valueOf - (valueOf % inMilliseconds)) / inMilliseconds;
    valueOf -= result * inMilliseconds;
    return result;
  };

  const toString = (h, m, s) => {
    if (h) {
      return `${h}h ${m}m ago`;
    } else if (m) {
      return `${m}m ${s}s ago`;
    } else {
      return `${s}s ago`;
    }
  };
  const mil = {
    hours: 60 * 60 * 1000,
    minutes: 60 * 1000,
    seconds: 1000
  };
  const hours = remainderOf(mil.hours);
  const minutes = remainderOf(mil.minutes);
  const seconds = remainderOf(mil.seconds);

  return toString(hours, minutes, seconds);
};

export const toRelevantTimeString = timestamp => {
  const now = Date.now();
  const old = 24 * 60 * 60 * 1000; // one day

  if (now - timestamp >= old) {
    return new Date(timestamp).toLocaleString("default", {
      day: "numeric",
      month: "numeric",
      year: "numeric"
    });
  } else {
    return toHoursMinutesSeconds(now - timestamp);
  }
};
