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

export const drawFrame = (guessesRemaining) => {
	let frame = 10;
	svgAnimator(frame);
	while(frame >= guessesRemaining) {
		svgAnimator(frame);
		frame -= 1;
	}
};

export const svgAnimator = (x) => {
	if(x === 10) {
		for(let i = 0; i < 10; i += 1) {
			let path = document.querySelector('#svg_' + i);
			let length = path.getTotalLength();
			// Clear any previous transition
			path.style.transition = path.style.WebkitTransition =
			  'none';
			// Set up the starting positions
			path.style.strokeDasharray = length + ' ' + length;
			path.style.strokeDashoffset = '0';
			// Trigger a layout so styles are calculated & the browser
			// picks up the starting position before animating
			path.getBoundingClientRect();
			// Define our transition
			path.style.transition = path.style.WebkitTransition =
			  'stroke-dashoffset 2s ease-in-out';
			// Go!
			path.style.strokeDashoffset = length;
		}
	} else {
		let path = document.querySelector('#svg_' + x);
		let length = path.getTotalLength();
		// Clear any previous transition
		path.style.transition = path.style.WebkitTransition =
		  'none';
		// Set up the starting positions
		path.style.strokeDasharray = length + ' ' + length;
		path.style.strokeDashoffset = length;
		// Trigger a layout so styles are calculated & the browser
		// picks up the starting position before animating
		path.getBoundingClientRect();
		// Define our transition
		path.style.transition = path.style.WebkitTransition =
		  'stroke-dashoffset 2s ease-in-out';
		// Go!
		path.style.strokeDashoffset = '0';
	}
}; // end svgAnimator()
