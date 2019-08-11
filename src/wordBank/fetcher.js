import Word_List from './wordList.min.js';
import { hasLocalStorageSupport, isOnline, checkStatus, fetchData } from '../utils/utils';

const CACHE_MAX = 100;

export const cacheWords = () => {
  if(hasLocalStorageSupport()) {

    const addWord = (word) => {
      const data = localStorage.getItem('cachedWords');
      if(!!data) {
        const newData = JSON.parse(data);
        newData.push(word);
        localStorage.setItem('cachedWords', JSON.stringify(newData));
      } else {
        localStorage.setItem('cachedWords', JSON.stringify([word]));
      }
    };

    const cacheLength = () => {
      const data = localStorage.getItem('cachedWords');
      if(!!data) {
        return (JSON.parse(data)).length;
      } else {
        return 0;
      }
    };

  	const trim = () => {
      const data = localStorage.getItem('cachedWords');
      if(!!data) {
        const parsedData = JSON.parse(data);
        while(parsedData.length > CACHE_MAX) {
    			parsedData.pop();
    		}
        localStorage.setItem('cachedWords', JSON.stringify(parsedData));
      }
  	};

  	// stop sending new requests when you reach max (or are offline)
  	if(cacheLength() < CACHE_MAX && isOnline()) {

  		// skip words shorter than 5 letters
  		let word = Word_List.getRandomWord();
  		while(word.length < 5) {
  			word = Word_List.getRandomWord();
  		}

  		fetchData(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=cb690753-1eb8-4661-a7f4-9adf25057760`)
  			.then(data => {
  				try {
  					const type = data[0].fl;
  					const def = data[0].shortdef[0];
  					if (def.length > 250) {
  						def = def.substring(0, 250);
  						def += '...';
  					}
  					let wordObj = {
  						word: word,
  						type: type,
  						def: def
  					};
  					addWord(wordObj);
  				} catch (err) {
  					console.log(`No definition retrieved. Skipping ${word}.`);
  				}
  			});
  	}

  	// trim cache if a late fetch results in more than max
  	if(cacheLength() > CACHE_MAX) {
  		trim();
  	}

  	// send requests slower the more words already in cache
  	let delay = cacheLength() * 10;
  	if(delay < 100) {
  		delay += 100;
  	} else if(delay > 500) {
  		delay = 500;
  	}

  	// offline? wait 10 seconds before attempting to fetch another definition
  	if(!isOnline()) {
  		delay = 10000;
  		console.log('Offline. Will check again in 10 seconds.');
  	}

  	setTimeout(cacheWords, delay);

  }
};
