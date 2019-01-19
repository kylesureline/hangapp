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

	letters.addEventListener('click', (e) => {
		const letter = e.target.textContent.toLowerCase();
		// guess(letter);
		e.target.style.display = 'none';
	});

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
		Data.wins += 1;
		endGame();
	}

	function lose() {
		// document.getElementById('win-lose').innerHTML = 'You lose! The word was <span>' + Hangapp.Data.answer +'</span>!';
		Data.losses += 1;
		endGame();
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
		if(hasLocalStorage()) {
			localStorage.setItem('HangappData', JSON.stringify(Hangapp.Data));
		}
	}
	function loadData() {
	  if(hasLocalStorage() && localStorage.getItem('HangappData') !== null) {
	    var d = JSON.parse(localStorage.getItem('HangappData'));
			for(p in d) {
				Hangapp.Data[p] = d[p];
			}
		} else {
			console.log('No support for localStorage or none previously saved. Loading default data.');
			Hangapp.Data = DEFAULT_DATA;
		}
	}

	function insertModal(content) {
		const modal = document.createElement('DIV');
		const firstChild = body.children[0];
		modal.className = 'modal';
		body.insertBefore(modal, firstChild);
	}

	function removeModal() {
		const modal = document.querySelector('.modal');
		body.removeChild(modal);
	}

	/* Event listeners */
	openbtn.addEventListener('click', (e) => {
		insertModal();
		sidebar.style.width = '275px';
	});

	sidebarNav.addEventListener('click', (e) => {
		if(e.target.className.includes('new-game')) {
			// NEW GAME!!!
		} else if(e.target.className.includes('closebtn')) {
			removeModal();
			sidebar.style.width = '0';
		}
	});

	sidebarForm.addEventListener('change', (e) => {
		const value = e.target.value;
		if(value === 'day' || value === 'night') {
			themeLink.href = 'assets/css/' + value + '.css';
		} else if(value === 'Easy') {

		} else if(value === 'Medium') {

		} else if(value === 'Hard') {

		}
	});

	const Hangapp = {
		endGame: function() {
			saveData();
			document.getElementById('definition').innerHTML = Hangapp.Data.def;
			Hangapp.printScore();
			fadeOutEffect('game-screen');
			fadeInEffect('end-screen');
			Hangapp.Data.guessedLetters = [];
			Hangapp.Data.guessedWord = [];
			document.getElementById('end-screen').style.display = 'inline';
			document.getElementById('new-game').children[0].disabled = false;
		},
		printScore: function() {
			document.getElementById('score-wins').innerHTML = 'Wins: ' + Hangapp.Data.wins;
			document.getElementById('score-losses').innerHTML = 'Losses: ' + Hangapp.Data.losses;
			document.getElementById('nav-wins').innerHTML = 'Wins: ' + Hangapp.Data.wins;
			document.getElementById('nav-losses').innerHTML = 'Losses: ' + Hangapp.Data.losses;
		},
		showGuessedLetters: function() {
			var guessedLetterChildren = document.getElementById('guessed-letters').children;
			for(var i = 0; i < guessedLetterChildren.length; i++) {
				guessedLetterChildren[i].style.display = 'inline';
			}
		},
		hideGuessedLetters: function() {
			for(var t = 0; t < Hangapp.Data.guessedLetters.length; t++) {
				document.getElementById('guess-' + Hangapp.Data.guessedLetters[t]).style.display = 'none';
			}
		},
		loadGame: function() {
			fadeOutEffect('end-screen');
			fadeInEffect('game-screen');
			Hangapp.hideGuessedLetters();
			Hangapp.printScore();
			Hangapp.drawFrame();
			Hangapp.placeBlanks();
			// disable the new game button from the end screen
			document.getElementById('new-game').children[0].disabled = true;
			// update the link for the end screen
			document.getElementById('citation').setAttribute('href', 'https://www.merriam-webster.com/dictionary/' + Hangapp.Data.answer + '/');
			document.getElementById('nav-cached-words').innerHTML = 'Cached Words: ' + Hangapp.Data.words.length;
		},
		beginGame: function() {
	    if(Hangapp.hasGuessed()) {
				var c = confirm('Are you sure you want to start a new game?');
				if(!c) {
					return false;
				}
			}
			Hangapp.Data.guessedWord = [];
			Hangapp.Data.guessedLetters = [];
			fadeOutEffect('end-screen');
			fadeInEffect('game-screen');
			Hangapp.chooseWord();
			Hangapp.getDef(Hangapp.Data.answer, false);
			Hangapp.Data.guesses = Hangapp.getNumberOfGuesses();
			Hangapp.showGuessedLetters();
			Hangapp.printScore();
			Hangapp.drawFrame();
			Hangapp.placeBlanks();
			// disable the new game button from the end screen
			document.getElementById('new-game').children[0].disabled = true;
			// update the link for the end screen
			document.getElementById('citation').setAttribute('href', 'https://www.merriam-webster.com/dictionary/' + Hangapp.Data.answer + '/');
			document.getElementById('nav-cached-words').innerHTML = 'Cached Words: ' + Hangapp.Data.words.length;
			saveData();
		},
		init: function() {
			// Nav.init();
			// loadData();
			// document.getElementById('difficulty').innerHTML = 'Difficulty: ' + Hangapp.Data.difficulty;
			// setStyle(Hangapp.Data.style);
			// Hangapp.attachEventHandlers();
			// if(!Hangapp.hasGuessed()) {
			// 	Hangapp.beginGame();
			// } else {
			// 	Hangapp.loadGame();
			// }
		},
		attachEventHandlers: function() {
			// keyboard input
			document.addEventListener('keydown', function(event) {
				var pattern = /^[a-z]/;
				// letter
				if(event.key.match(pattern)) {
					Hangapp.guess(event.key);
					Nav.close();
				}
				// new game
				else if(event.key == 'Enter' || event.key == 'N') {
					if(Hangapp.hasGuessed()) {
						var c = confirm('Do you want to start a new game?');
						if(c) {
							Hangapp.Data.guessedLetters = [];
							Hangapp.Data.guessedWord = [];
							saveData();
							Hangapp.beginGame();
						}
					} else {
						Hangapp.beginGame();
					}
				}
				// Dark theme
				else if(event.key == 'D') {
					setStyle('night');
				}
				// Light theme
				else if(event.key == 'L') {
					setStyle('day');
				}
				// Easy difficulty
				else if(event.key == 'E') {
					Hangapp.Difficulty.choose('Easy');
				}
				// Medium difficulty
				else if(event.key == 'M') {
					Hangapp.Difficulty.choose('Medium');
				}
				// Hard difficulty
				else if(event.key == 'H') {
					Hangapp.Difficulty.choose('Hard');
				}
			});

			// close the nav by tapping anywhere else
			var body = document.getElementById('main');
			var except = document.getElementById('openbtn');

			body.addEventListener('click', function () {
				Nav.close();
				}, false);
			except.addEventListener('click', function (ev) {
				Nav.toggle();
				ev.stopPropagation();
			}, false);

			var guessedLetters = document.getElementById('guessed-letters');

			for(var i = 0; i < guessedLetters.childElementCount; i++) {
				var btn = guessedLetters.children[i];
				var ltr = (btn.innerHTML).toLowerCase();
				btn.setAttribute('id', 'guess-' + ltr);
				btn.onclick = Hangapp.guess;
			}
		},
	};
	function svgAnimator(x) {
		if(x == 10) {
			for(var i = 0; i < 10; i++) {
				var path = document.querySelector('#svg_' + i);
				var length = path.getTotalLength();
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
			var path = document.querySelector('#svg_' + x);
			var length = path.getTotalLength();
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
		if(Hangapp.isDayTheme()) {
			setStyle('night');
		} else {
			setStyle('day');
		}
	}
	function setStyle(s) {
		highlightEffect('theme', Hangapp.isDayTheme(), 500);
		document.getElementById('day-night-stylesheet').setAttribute('href', 'assets/css/' + s + '.css');
		var str = s.charAt(0).toUpperCase() + s.substr(1);
		document.getElementById('theme').innerHTML = 'Theme: ' + str;
		Hangapp.Data.style = s
		saveData();
	}
	var Nav = {
	  start: 0,
	  end: 250,
	  isOpening: false,
	  isClosing: false,
	  effect: '',
		init: function() {
			// ensure that first click opens the nav bar
			document.getElementById('mySidebar').style.width = '0px';
		},
	  open: function() {
			var target = document.getElementById('mySidebar');
			var counter = parseInt(target.style.width);
			Nav.isOpening = true;
			Nav.isClosing = false;
			Nav.effect = setInterval(function() {
				if(counter < Nav.end) {
					counter+=3;
					target.style.width = counter + 'px';
				} else {
					// is open
					clearInterval(Nav.effect);
					target.style.width = Nav.end + 'px';
					Nav.isOpening = false;
				}
			}, 2);
	  },
	  close: function() {
	    var target = document.getElementById('mySidebar');
	    var counter = parseInt(target.style.width);
			Nav.isOpening = false;
			Nav.isClosing = true;
	    Nav.effect = setInterval(function() {
	      if(counter > Nav.start) {
	          counter-=3;
	          target.style.width = counter + 'px';
	      } else {
	          // is closed
	          clearInterval(Nav.effect);
	          target.style.width = Nav.start + 'px';
	          Nav.isClosing = false;
	      }
	    }, 2);
	  },
	  toggle: function() {
	    var target = document.getElementById('mySidebar');
	    // check if opening or closing
	    if(Nav.isOpening) {
	        // stop interval
	        clearInterval(Nav.effect);
	        // close
	        Nav.close();
	    } else if(Nav.isClosing) {
	        // stop interval
	        clearInterval(Nav.effect);
	        // open
	        Nav.open();
	    } else if(parseInt(target.style.width) == Nav.start) {
				Nav.open();
	    } else {
	      Nav.close();
	    }
	  }
	}
	function fadeOutEffect(target) {
		document.getElementById(target).style.opacity = 0;
		document.getElementById(target).style.display = 'none';
	}
	function fadeInEffect(target) {
		document.getElementById(target).style.display = 'inline';
		var fadeTarget = document.getElementById(target);
		var counter = 0;
		fadeTarget.style.opacity = counter;
		var fadeEffect = setInterval(function () {
			if (counter < 0.9) {
				counter += 0.1
				fadeTarget.style.opacity = counter.toFixed(1);
			} else {
				clearInterval(fadeEffect);
			}
		}, 50);
	}
	function highlightEffect(target, t, length) {
		var highlightTarget = document.getElementById(target);
		if(t) {
			highlightTarget.style.color = 'white';
			setTimeout(function() {
				highlightTarget.style.color = '#818181';
			}, length);
		} else {
			highlightTarget.style.color = 'black';
			setTimeout(function() {
				highlightTarget.style.color = '#7E7E7E';
			}, length);
		}
	}
	// start caching words
	// setInterval(Hangapp.cacheWords, 700);
// });
