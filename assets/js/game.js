// document.addEventListener('DOMContentLoaded', () => {

	const body = document.getElementsByTagName('body')[0];
	const openbtn = document.querySelector('.openbtn');
	const sidebar = document.querySelector('.sidebar');
	const sidebarNav = sidebar.querySelector('ul');
	const sidebarForm = sidebar.querySelector('form');
	const themeLink = document.querySelector('.theme');
	const inputDiv = document.querySelector('.input');
	const wordH2 = inputDiv.querySelector('h2');
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
		words: [],
		definitions: [],
		answer: '',
		guessedWord: [],
		guessedLetters: [],
		def: '',
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
		toggle: () => {
			if(Data.difficulty === 'Easy') {
				Difficulty.choose('Medium');
			} else if(Data.difficulty === 'Medium') {
				Difficulty.choose('Hard');
			} else {
				Difficulty.choose('Easy');
			}
		},
		choose: (d) => {
			if(hasGuessed()) {
				if(Difficulty.confirmChange()) {
					Data.difficulty = d;
					Data.guesses = getNumberOfGuesses();
					// document.getElementById('difficulty').innerHTML = 'Difficulty: ' + Hangapp.Data.difficulty;
					drawFrame();
					beginGame();
				}
			}
			else {
				Data.difficulty = d;
				Data.guesses = getNumberOfGuesses();
				// document.getElementById('difficulty').innerHTML = 'Difficulty: ' + Hangapp.Data.difficulty;
				drawFrame();
			}
			// highlightEffect("difficulty", !Hangapp.isDayTheme(), 500);
			saveData();
		}
	};

	function hasGuessed() {
		return Data.guessedLetters.length !== 0;
	}

	function hasEnded() {
		return Data.guessedLetters.length === 0 && Data.guessedWord.length === 0;
	}

	function isDayTheme() {
		return Data.style === 'day';
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

	function isOnline() {
		return navigator.onLine;
	}

	function cacheWords() {
		if(isOnline()) {
			// cache limited number of words
			if(Data.words.length < 50) {
				let w = Word_List.getRandomWord();
				getDef(w, true);
				setTimeout(() => {
					if(cacheDef !== '') {
						// found a word with a definition!
						Data.words.push(w);
						Data.definitions.push(cacheDef);
						highlightEffect('nav-cached-words', !isDayTheme(), 200);
						saveData();
						// document.getElementById('nav-cached-words').innerHTML = 'Cached Words: ' + Hangapp.Data.words.length;
					}
				}, 500);
			}
			printScore();
		}
	}

	function guessedWordStr() {
		return Data.guessedWord.toString().replace(/,/g, '');
	}

	function chooseWord() {
		// no words in cache
		if(Data.words.length === 0) {
			Data.answer = Word_List.getRandomWord();
		}
		// words in cache
		else {
			Data.answer = Data.words.shift();
			Data.def = Data.definitions.shift();
		}
		for(let x = 0; x < Data.answer.length; x += 1) {
			Data.guessedWord[x] = ' ';
		}
		saveData();
	}

	function placeBlanks() {
		// clear the value on the page
		while(wordH2.firstChild) {
			wordH2.removeChild(wordH2.firstChild);
		}
		// create a span with an underscore for each character of the answer
		for(let i = 0; i < Data.answer.length; i += 1) {
			let span = document.createElement('SPAN');
			if(Data.guessedWord[i] === ' ') {
				span.textContent = '_';
			} else {
				span.textContent = Data.guessedWord[i];
			}
			wordH2.appendChild(span);
		}
	}

	function getDef(word, toCache) {
		if(isOnline()) {
			const apiURL = 'https://dictionaryapi.com/api/v3/references/collegiate/json/' + word + '?key=cb690753-1eb8-4661-a7f4-9adf25057760';
			loadJSON(apiURL, function(data) {
				// got a definition! :)
				try {
					const type = data[0].fl;
					const def = data[0].shortdef[0];
					if (def.length > 250) {
						def = def.substring(0, 250);
						def += '...';
					}
					if(toCache) {
						cacheDef = type + ': ' + def;
					}
					else {
						Data.def = type + ': ' + def;
					}
				}
				// couldn't get a definition! :(
				catch(err) {
					if(toCache) {
						cacheDef = '';
					}
					else {
						Data.def = '';
					}
				}
			}, function(xhr) {
				Data.def = 'Error';
			});
		} else {
			cacheDef = '';
			Data.def = 'User offline. Reconnect to get definitions.';
		}
	}

	function isGuessedLetter(letter) {
		for(let i = 0; i < Data.guessedLetters.length; i += 1) {
			if(letter === Data.guessedLetters[i]) {
				return true;
			}
		}
		return false;
	}

	function guess(letter) {
		let wrongGuess = 0;
		if(!isGuessedLetter(letter)) {
			Data.guessedLetters.push(letter);
			for(let t = 0; t < Data.answer.length; t += 1) {
				if(letter === Data.answer[t]) {
					wordH2.children[t].textContent = letter;
					Data.guessedWord[t] = letter;
				}
				else {
					wrongGuess += 1;
				}
			}
			if(wrongGuess === Data.answer.length) {
				Data.guesses -= 1;
				svgAnimator(Data.guesses);
			}
			if(Data.guesses === 0) {
				lose();
			}
			else if(Data.answer === guessedWordStr()) {
				win();
			}
		}
		saveData();
	}

	function win() {
		// document.getElementById('win-lose').innerHTML = 'You win! The word was <span>' + Hangapp.Data.answer +'</span>!';
		wonOrLost = 'won';
		Data.wins += 1;
		endGame();
	}

	function lose() {
		// document.getElementById('win-lose').innerHTML = 'You lose! The word was <span>' + Hangapp.Data.answer +'</span>!';
		wonOrLost = 'lost';
		Data.losses += 1;
		endGame();
	}

	function endGame() {
		insertModal(true);
		saveData();
		// document.getElementById('definition').innerHTML = Hangapp.Data.def;
		printScore();
		// fadeOutEffect('game-screen');
		// fadeInEffect('end-screen');
		Data.guessedLetters = [];
		Data.guessedWord = [];
		// document.getElementById('end-screen').style.display = 'inline';
		// document.getElementById('new-game').children[0].disabled = false;
	}

	function printScore() {
		navInfo.wins.textContent = Data.wins;
		navInfo.losses.textContent = Data.losses;
		navInfo.cachedWords.textContent = Data.words.length;
	}

	function showGuessedLetters() {
		for(let i = 0; i < letters.children.length; i += 1) {
			letters.children[i].style.display = '';
		}
	}

	function hideGuessedLetters() {
		for(let i = 0; i < Data.guessedLetters.length; i += 1) {
			let guessedLetter = Data.guessedLetters[i];
			for(let t = 0; t < letters.children.length; t += 1) {
				let button = letters.children[t];
				let buttonLetter = button.textContent.toLowerCase();
				if(guessedLetter === buttonLetter) {
					button.style.display = 'none';
				}
			}
		}
	}

	function loadGame() {
		hideGuessedLetters();
		// printScore();
		drawFrame();
		placeBlanks();
	}

	function beginGame() {
		if(hasGuessed()) {
			const c = confirm('Are you sure you want to start a new game?');
			if(!c) {
				return false;
			}
		}
		Data.guessedWord = [];
		Data.guessedLetters = [];
		removeModal();
		chooseWord();
		getDef(Data.answer, false);
		Data.guesses = getNumberOfGuesses();
		showGuessedLetters();
		// printScore();
		drawFrame();
		placeBlanks();
		saveData();
	}

	function init() {
		loadData();
		setStyle(Data.style);
		// Hangapp.attachEventHandlers();
		if(!hasGuessed()) {
			beginGame();
		} else {
			loadGame();
		}
	}


	function loadJSON(path, success, error) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == XMLHttpRequest.DONE) {
				if (xhr.status == 200) {
					if (success)
						success(JSON.parse(xhr.responseText));
				} else {
					if (error)
						error(xhr);
				}
			}
		};
		xhr.open('GET', path, true);
		xhr.send();
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

	function saveData() {
		// if(hasLocalStorage()) {
		// 	localStorage.setItem('HangappData', JSON.stringify(Data));
		// }
	}

	function loadData() {

		function selectRadioButtons() {
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
		}

	  if(hasLocalStorage() && localStorage.getItem('HangappData') !== null) {
	    const d = JSON.parse(localStorage.getItem('HangappData'));
			for(p in d) {
				Data[p] = d[p];
			}
			printScore();
			selectRadioButtons();
		} else {
			console.log('No support for localStorage or none previously saved. Loading default data.');
			Data = DEFAULT_DATA;
		}
	}

	function insertModal(content) {
		function createElement(tagName) {
			return document.createElement(tagName);
		}
		function generateModalContent() {

			// <div class="modal-content">
			// 	<p>You <span>lose</span>! The word was <span>jazz</span>!</p>
			// 	<p>American music developed especially from ragtime and blues and characterized by propulsive syncopated rhythms, polyphonic ensemble playing, varying degrees of improvisation, and often deliberate distortions of pitch and timbre</p>
			// 	<button>New Game</button>
			// 	<p><span>Wins: <span>5</span></span>
			// 		<span>Losses: <span>7</span></span></p>
			// 	<p><a>Definitions provided by m-w.com<i class="fas fa-external-link-alt"></i></a></p>
			// </div>

			const div = createElement('DIV');
			div.className = 'modal-content';

			const pMessage = createElement('p');
			pMessage.innerHTML = 'You <span>' + wonOrLost + '</span>! The word was <span>' + Data.answer + '</span>!';
			div.appendChild(pMessage);

			const pDef = createElement('p');
			pDef.textContent = Data.def;
			div.appendChild(pDef);

			const button = createElement('button');
			button.textContent = 'New Game';
			button.addEventListener('click', () => {
				beginGame();
				removeModal();
			});
			div.appendChild(button);

			const pScore = createElement('p');
			pScore.innerHTML = '<span>Wins: <span>' + Data.wins + '</span></span><span>Losses: <span>' + Data.losses + '</span></span>';
			div.appendChild(pScore);

			const pCitation = createElement('p');
			pCitation.innerHTML = '<a href="https://www.merriam-webster.com/dictionary/' + Data.answer + '/">Definitions provided by m-w.com<i class="fas fa-external-link-alt"></i></a>';
			div.appendChild(pCitation);

			return div;
		}
		const modal = document.createElement('DIV');
		modal.className = 'modal';
		if(content != undefined) {
			modal.appendChild(generateModalContent());
		}
		const firstChild = body.children[0];
		body.insertBefore(modal, firstChild);
	}

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
	}

	function toggleTheme() {
		if(isDayTheme()) {
			setStyle('night');
		} else {
			setStyle('day');
		}
	}

	function setStyle(s) {
		// highlightEffect('theme', isDayTheme(), 500);
		themeLink.href = 'assets/css/' + s + '.css';
		Data.style = s
		saveData();
	}

	function highlightEffect(target, t, length) {
		// var highlightTarget = document.getElementById(target);
		// if(t) {
		// 	highlightTarget.style.color = 'white';
		// 	setTimeout(function() {
		// 		highlightTarget.style.color = '#818181';
		// 	}, length);
		// } else {
		// 	highlightTarget.style.color = 'black';
		// 	setTimeout(function() {
		// 		highlightTarget.style.color = '#7E7E7E';
		// 	}, length);
		// }
	}
	// start caching words

	/* Event listeners */
	openbtn.addEventListener('click', (e) => {
		insertModal();
		sidebar.style.width = '275px';
	});

	sidebarNav.addEventListener('click', (e) => {
		function close() {
			removeModal();
			sidebar.style.width = '0';
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
		} else if('Easy Medium Hard'.includes(value) ) {
			Difficulty.choose(value);
		}
	});

	letters.addEventListener('click', (e) => {
		const letter = e.target.textContent.toLowerCase();
		guess(letter);
		e.target.style.display = 'none';
	});

	document.addEventListener('keydown', (event) => {
		const pattern = /^[a-z]/;
		const key = event.key;
		// letter
		if(key.match(pattern) && !hasEnded()) {
			guess(key);
			hideGuessedLetters();
		}
		// new game
		else if(key === 'Enter' || key === 'N') {
			if(hasGuessed()) {
				let c = confirm('Do you want to start a new game?');
				if(c) {
					Data.guessedLetters = [];
					Data.guessedWord = [];
					saveData();
					beginGame();
				}
			} else {
				beginGame();
			}
		}
		// Dark theme
		else if(key === 'D') {
			setStyle('night');
		}
		// Light theme
		else if(key === 'L') {
			setStyle('day');
		}
		// Easy difficulty
		else if(key === 'E') {
			Difficulty.choose('Easy');
		}
		// Medium difficulty
		else if(key === 'M') {
			Difficulty.choose('Medium');
		}
		// Hard difficulty
		else if(key == 'H') {
			Difficulty.choose('Hard');
		}
	});

	init();

	setInterval(cacheWords, 700);
// });
