// document.addEventListener('DOMContentLoaded', () => {

	const body = document.getElementsByTagName('body')[0];
	const openbtn = document.querySelector('.openbtn');
	const sidebar = document.querySelector('.sidebar');
	const sidebarNav = sidebar.querySelector('ul');
	const sidebarForm = sidebar.querySelector('form');
	const themeLink = document.querySelector('.theme');
	const inputDiv = document.querySelector('.input');
	const wordH2 = inputDiv.querySelector('h2');
	const hint = inputDiv.querySelector('.hint');
	const letters = document.querySelector('.letters');
	const navInfoUL = sidebar.querySelector('.nav-info ul');
	let wonOrLost = '';
	const navInfo = {
		wins: navInfoUL.children[0].firstElementChild,
		losses: navInfoUL.children[1].firstElementChild,
		cachedWords: navInfoUL.children[2].firstElementChild,
		version: navInfoUL.children[3].firstElementChild
	}
	const DEFAULT_DATA = {
		style: 'day',
		wins: 0,
		losses: 0,
		guesses: 10,
		cache: [],
		answer: {},
		guessedWord: [],
		guessedLetters: [],
		difficulty: 'Easy'
	};
	let Data = {};
	let cacheDef = '';

	const Difficulty = {
		confirmChange: () => {
			const c = confirm('Changing difficulty in the middle of game will restart. Are you sure?');
			if(c) {
				Data.guessedLetters = [];
				Data.guessedWord = [];
				return true;
			}
			return false;
		},
		choose: (d) => {
			if(Data.difficulty === d) {
				return true;
			}
			if(hasGuessed()) {
				if(Difficulty.confirmChange()) {
					Data.difficulty = d;
					Data.guesses = getNumberOfGuesses();
					drawFrame();
					beginGame();
				}
			}
			else {
				Data.difficulty = d;
				Data.guesses = getNumberOfGuesses();
				drawFrame();
			}
		}
	};

	function setStyle(s) {
		themeLink.href = 'assets/css/' + s + '.css';
		Data.style = s;
	}

	function hasLocalStorage() {
		var testingLS = 'testingLS';
		try {
			localStorage.setItem(testingLS, testingLS);
			localStorage.removeItem(testingLS);
			return true;
		}
		catch (e) {
			console.log('Sorry, your browser does not support Web Storage...');
			return false;
		}
	}

	function hasGuessed() {
		return Data.guessedLetters.length !== 0;
	}

	function hasEnded() {
		return Data.guessedLetters.length === 0 && Data.guessedWord.length === 0;
	}

	function isDayTheme() {
		return Data.style === 'day';
	}

	function isOnline() {
		return navigator.onLine;
	}

	function getNumberOfGuesses() {
		if(Data.difficulty === 'Easy') {
			return 10;
		}
		else if(Data.difficulty === 'Medium') {
			return 7;
		}
		return 4;
	}

	function drawFrame() {
		let frame = 10;
		svgAnimator(frame);
		while(frame >= Data.guesses) {
			svgAnimator(frame);
			frame -= 1;
		}
	}

	function inputHandler(event) {

		let letter = '';

		if(event.key === undefined) {
			if(event.target.tagName === 'BUTTON' && event.target.textContent != 'New Game') {
				letter = event.target.textContent.toLowerCase();
			}
		} else {
			letter = event.key;
		}

		const pattern = /^[a-z]/;
		switch(letter) {
			case 'Enter':
			case 'N':
				if(hasGuessed()) {
					let c = confirm('Do you want to start a new game?');
					if(c) {
						Data.guessedLetters = [];
						Data.guessedWord = [];
						beginGame();
						removeModal();
						sidebar.style.width = '';
					}
				} else {
					beginGame();
					removeModal();
					sidebar.style.width = '';
				}
				break;
			case 'D':
				setStyle('night');
				break;
			case 'L':
				setStyle('day');
				break;
			case 'E':
				Difficulty.choose('Easy');
				break;
			case 'M':
				Difficulty.choose('Medium');
				break;
			case 'H':
				Difficulty.choose('Hard');
				break;
			default:
				if(letter.match(pattern) && !hasEnded()) {
					guess(letter);
					hideGuessedLetters();
				}
				break;
		}
		saveData();
	}

	function addMultipleListeners(element,events,handler) {
	  if (!(events instanceof Array)){
	    throw 'addMultipleListeners: '+
	          'please supply an array of eventstrings '+
	          '(like ["click","mouseover"])';
	  }
	  for (let i = 0;i < events.length; i += 1){
	    element.addEventListener(events[i],handler);
	  }
	}

	function placeBlanks() {
		// remove the answer word from the page
		while(wordH2.firstChild) {
			wordH2.removeChild(wordH2.firstChild);
		}
		// create a span with an underscore for each character of the answer
		for(let i = 0; i < Data.answer.word.length; i += 1) {
			let span = document.createElement('SPAN');
			if(Data.guessedWord[i] === ' ') {
				span.textContent = '_';
			} else {
				span.textContent = Data.guessedWord[i];
			}
			wordH2.appendChild(span);
		}
		hint.textContent = `${Data.answer.type}`;
	}

	function cacheWords() {

		// helper functions
		function checkStatus(response) {
		  if(response.ok) {
		    return Promise.resolve(response);
		  } else {
		    return Promise.reject(new Error(response.statusText));
		  }
		}
		function fetchData(url) {
		  return fetch(url)
		            .then(checkStatus)
		            .then(res => res.json())
		            .catch(error => console.log('Looks like there was a problem', error));
		}

		// skip words shorter than 5 letters
		let word = Word_List.getRandomWord();
		while(word.length < 5) {
			word = Word_List.getRandomWord();
		}

		if(Data.cache.length < 50 && isOnline()) {
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
						Data.cache.push(wordObj);
						printScore();
					} catch (err) {
						console.log(`No definition retrieved. Skipping ${word}.`);
					}
				});
		}

		setTimeout(cacheWords, 100);
	}

	function guess(letter) {

		function isGuessedLetter(letter) {
			for(let i = 0; i < Data.guessedLetters.length; i += 1) {
				if(letter === Data.guessedLetters[i]) {
					return true;
				}
			}
			return false;
		}

		function guessedWordStr() {
			return Data.guessedWord.toString().replace(/,/g, '');
		}

		function win() {
			wonOrLost = 'won';
			Data.wins += 1;
			endGame();
		}

		function lose() {
			wonOrLost = 'lost';
			Data.losses += 1;
			endGame();
		}

		function endGame() {
			insertModal(true);
			saveData();
			printScore();
			Data.guessedLetters = [];
			Data.guessedWord = [];
		}

		let wrongGuess = 0;
		if(letter.length < 2 && !isGuessedLetter(letter)) {
			Data.guessedLetters.push(letter);
			for(let t = 0; t < Data.answer.word.length; t += 1) {
				if(letter === Data.answer.word[t]) {
					wordH2.children[t].textContent = letter;
					Data.guessedWord[t] = letter;
				}
				else {
					wrongGuess += 1;
				}
			}
			if(wrongGuess === Data.answer.word.length) {
				Data.guesses -= 1;
				svgAnimator(Data.guesses);
			}
			if(Data.guesses === 0) {
				lose();
			}
			else if(Data.answer.word === guessedWordStr()) {
				win();
			}
		}
	} // end guess()

	function printScore() {
		navInfo.wins.textContent = Data.wins;
		navInfo.losses.textContent = Data.losses;
		navInfo.cachedWords.textContent = Data.cache.length;
	}

	function showGuessedLetters() {
		for(let i = 0; i < letters.children.length; i += 1) {
			let button = letters.children[i];
			button.className = '';
			button.disabled = false;
		}
	}

	function hideGuessedLetters() {
		for(let i = 0; i < Data.guessedLetters.length; i += 1) {
			let guessedLetter = Data.guessedLetters[i];
			for(let t = 0; t < letters.children.length; t += 1) {
				let button = letters.children[t];
				let buttonLetter = button.textContent.toLowerCase();
				if(guessedLetter === buttonLetter) {
					button.className = 'chosen';
					button.disabled = true;
				}
			}
		}
	}

	function beginGame() {

		function chooseWord() {
			// no words in cache
			if(Data.cache.length === 0) {
				Data.answer.word = Word_List.getRandomWord();
				Data.answer.type = '';
				Data.answer.def = '';
			}
			// words in cache
			else {
				let wordObj = Data.cache.shift();
				Data.answer.word = wordObj.word;
				Data.answer.type = wordObj.type;
				Data.answer.def = wordObj.def;
			}
			for(let x = 0; x < Data.answer.word.length; x += 1) {
				Data.guessedWord[x] = ' ';
			}
		} // end chooseWord()

		if(hasGuessed()) {
			const c = confirm('Are you sure you want to start a new game?');
			if(!c) {
				return false;
			}
		}
		Data.guessedWord = [];
		Data.guessedLetters = [];
		printScore();
		chooseWord();
		Data.guesses = getNumberOfGuesses();
		showGuessedLetters();
		drawFrame();
		placeBlanks();
		saveData();
	} // end beginGame

	function init() {

		function loadGame() {
			hideGuessedLetters();
			drawFrame();
			placeBlanks();
		}

		addMultipleListeners(document, ['keydown', 'click'], inputHandler);

		loadData();

		// start caching
		cacheWords();

		if(!hasGuessed()) {
			beginGame();
		} else {
			loadGame();
		}
	}

	function saveData() {
		if(hasLocalStorage()) {
			localStorage.setItem('HangappData', JSON.stringify(Data));
		}
	}

	function loadData() {

		function backwardsCompatFix() {
			if(Data.words !== undefined) {
				console.log('Old localStorage format found! Fixing...');
				Data.cache = Data.words.map((word, index) => {
					let wordObj = {
						word: word,
						type: '',
						def: Data.definitions[index]
					}
					return wordObj;
				});
				delete Data.words;
				delete Data.definitions;
				console.log('Fixed!');
			}
		}

		function checkRadioButtons() {
			const radioButtons = sidebarForm.querySelectorAll('input');

			for(let i = 0; i < radioButtons.length; i += 1) {
				let radioButton = radioButtons[i];
				if(Data.style === radioButton.id) {
					radioButton.checked = true;
				} else if(Data.difficulty === radioButton.id) {
					radioButton.checked = true;
				}
			}

			setStyle(Data.style);
			Difficulty.choose(Data.difficulty);
		} // end checkRadioButtons()

	  if(hasLocalStorage() && localStorage.getItem('HangappData') !== null) {
	    const d = JSON.parse(localStorage.getItem('HangappData'));
			for(p in d) {
				Data[p] = d[p];
			}
			backwardsCompatFix();
			checkRadioButtons();
		} else {
			console.log('No support for localStorage or none previously saved. Loading default data.');
			Data = DEFAULT_DATA;
		}

		printScore();
	} // end loadData()

	function insertModal(content) {

		function createElement(tagName) {
			return document.createElement(tagName);
		}

		function generateModalContent() {

			const div = createElement('DIV');
			div.className = 'modal-content';

			const pMessage = createElement('p');
			pMessage.innerHTML = `You ${wonOrLost}! The word was ${Data.answer.word}!`;
			div.appendChild(pMessage);

			if(Data.answer.def !== '') {
				const pDef = createElement('p');
				pDef.textContent = `${Data.answer.type}: ${Data.answer.def}`;
				div.appendChild(pDef);
			}

			const button = createElement('button');
			button.textContent = 'New Game';
			button.addEventListener('click', () => {
				beginGame();
				removeModal();
			});
			div.appendChild(button);

			const pScore = createElement('p');
			pScore.innerHTML = 'Wins: ' + Data.wins + ' Losses: ' + Data.losses;
			div.appendChild(pScore);

			const pCitation = createElement('p');
			pCitation.innerHTML = '<a href="https://www.merriam-webster.com/dictionary/' + Data.answer.word + '/">Definitions provided by m-w.com<i class="fas fa-external-link-alt"></i></a>';
			div.appendChild(pCitation);

			return div;
		} // end generateModalContent()

		const modal = document.createElement('DIV');
		modal.className = 'modal';
		if(content !== undefined) {
			modal.appendChild(generateModalContent());
		}
		const firstChild = body.children[0];
		body.insertBefore(modal, firstChild);
	} // end insertModal()

	function removeModal() {
		const modal = document.querySelector('.modal');
		if(modal) {
			body.removeChild(modal);
		}
	}

	function svgAnimator(x) {
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
	} // end svgAnimator()

	/* Event listeners */
	openbtn.addEventListener('click', (e) => {
		sidebar.style.width = '275px';
	});

	sidebarNav.addEventListener('click', (e) => {
		function close() {
			removeModal();
			sidebar.style.width = '';
		}
		if(e.target.className.includes('new-game')) {
			beginGame();
			close();
		} else if(e.target.className.includes('closebtn')) {
			close();
		}
	});

	sidebarForm.addEventListener('change', (e) => {
		const value = e.target.value;
		if(value === 'day' || value === 'night') {
			themeLink.href = 'assets/css/' + value + '.css';
			Data.style = value;
		} else if('Easy Medium Hard'.includes(value) ) {
			Difficulty.choose(value);
		}
		saveData();
	});

	// initialize Hangapp
	init();

// });
