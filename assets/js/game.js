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

var DEFAULT_DATA = {
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

var Hangapp = {
	Data: {},
	hasGuessed: function() {
		return Hangapp.Data.guessedLetters.length !== 0;
	},
	hasEnded: function() {
    return Hangapp.Data.guessedLetters.length === 0 && Hangapp.Data.guessedWord.length === 0;
	},
	cacheDef: '',
	isDayTheme: function() {
		if(Hangapp.Data.style === 'day') {
			return true;
		} else {
			return false;
		}
	},
	getNumberOfGuesses: function() {
		if(Hangapp.Data.difficulty == 'Easy') {
			return 10;
		}
		else if(Hangapp.Data.difficulty == 'Medium') {
			return 7;
		}
		else {
			return 4;
		}
	},
	Difficulty: {
		check: function() {
			var c = confirm('Changing difficulty in the middle of game will restart. Are you sure?');
			if(c) {
				Hangapp.Data.guessedLetters = [];
				Hangapp.Data.guessedWord = [];
				return true;
			}
			return false;
		},
		toggle: function() {
			if(Hangapp.Data.difficulty == 'Easy') {
				Hangapp.Difficulty.choose('Medium');
			} else if(Hangapp.Data.difficulty == 'Medium') {
				Hangapp.Difficulty.choose('Hard');
			} else {
				Hangapp.Difficulty.choose('Easy');
			}
		},
		choose: function(d) {
			if(Hangapp.hasGuessed()) {
				if(Hangapp.Difficulty.check()) {
					Hangapp.Data.difficulty = d;
					Hangapp.Data.guesses = Hangapp.getNumberOfGuesses();
					document.getElementById('difficulty').innerHTML = 'Difficulty: ' + Hangapp.Data.difficulty;
					Hangapp.drawFrame();
					Hangapp.beginGame();
				}
			}
			else {
				Hangapp.Data.difficulty = d;
				Hangapp.Data.guesses = Hangapp.getNumberOfGuesses();
				document.getElementById('difficulty').innerHTML = 'Difficulty: ' + Hangapp.Data.difficulty;
				Hangapp.drawFrame();
			}
			highlightEffect("difficulty", !Hangapp.isDayTheme(), 500);
			saveData();
		}
	},
	drawFrame: function() {
		var frame = 10;
		svgAnimator(frame);
		while(frame >= Hangapp.Data.guesses) {
			svgAnimator(frame);
			frame--;
		}
	},
	emptyCache: function() {
		if (hasLocalStorage()) {
			var c = confirm('This will clear your score and all saved words and definitions. Are you sure?');
			if(c) {
				localStorage.removeItem('HangappData');
				location.reload();
			}
		}
	},
	cacheWords: function() {
		var online = navigator.onLine;
		if(online) {
			// cache limited number of words
			if(Hangapp.Data.words.length < 50) {
				var w = Word_List.getRandomWord();
				Hangapp.getDef(w, true);
				setTimeout(function() {
					if(Hangapp.cacheDef != '') {
						// found a word with a definition!
						Hangapp.Data.words.push(w);
						Hangapp.Data.definitions.push(Hangapp.cacheDef);
						highlightEffect('nav-cached-words', !Hangapp.isDayTheme(), 200);
						saveData();
						document.getElementById('nav-cached-words').innerHTML = 'Cached Words: ' + Hangapp.Data.words.length;
					}
				}, 500);
			}
		}
	},
	guessedWordStr: function() {
		return Hangapp.Data.guessedWord.toString().replace(/,/g, '');
	},
	chooseWord: function() {
		// no words in cache
		if(Hangapp.Data.words == '') {
			console.log('No words in cache');
			Hangapp.Data.answer = Word_List.getRandomWord();
		}
		// words in cache
		else {
			console.log('Words in cache');
			Hangapp.Data.answer = Hangapp.Data.words.shift();
			Hangapp.Data.def = Hangapp.Data.definitions.shift();
		}
		for(var x = 0; x < Hangapp.Data.answer.length; x++) {
			Hangapp.Data.guessedWord[x] = ' ';
		}
    saveData();
	},
	placeBlanks: function() {
		// clear the value on the page
		document.getElementById('word').innerHTML = '';
		// create a span with an underscore for each character of the answer
		for(var i = 0; i < Hangapp.Data.answer.length; i++) {
			var node = document.createElement('SPAN');
			node.setAttribute('id', 'answer-' + i);
			if(Hangapp.Data.guessedWord[i] === ' ') {
				var textNode = document.createTextNode('_');
			}
			else {
				var textNode = document.createTextNode(Hangapp.Data.guessedWord[i]);
			}
			node.appendChild(textNode);
			document.getElementById('word').appendChild(node);
		}
	},
	getDef: function(word, toCache) {
		var online = navigator.onLine;
		if(online) {
			var apiURL = 'https://dictionaryapi.com/api/v3/references/collegiate/json/' + word + '?key=cb690753-1eb8-4661-a7f4-9adf25057760';
			loadJSON(apiURL, function(data) {
				// got a definition! :)
				try {
					var type = data[0].fl;
					var def = data[0].shortdef[0];
					if (def.length > 250) {
						def = def.substring(0, 250);
						def += '...';
					}
					if(toCache) {
						Hangapp.cacheDef = type + ': ' + def;
					}
					else {
						Hangapp.Data.def = type + ': ' + def;
					}
				}
				// couldn't get a definition! :(
				catch(err) {
					if(toCache) {
						Hangapp.cacheDef = '';
					}
					else {
						Hangapp.Data.def = '';
					}
				}
			}, function(xhr) {
				Hangapp.Data.def = 'Error';
			});
		} else {
			Hangapp.cacheDef = '';
			Hangapp.Data.def = 'User offline. Reconnect to get definitions.';
		}
	},
	isGuessedLetter: function(ltr) {
		for(var u = 0; u < Hangapp.Data.guessedLetters.length; u++) {
			if(ltr == Hangapp.Data.guessedLetters[u]) {
				return true;
			}
		}
		return false;
	},
	guess: function(a) {
    if(!Hangapp.hasEnded()) {
			// click guess
			try {
				var ltr = this.innerHTML.toLowerCase();
			}
			// keyboard guess
			catch (e) {
				var ltr = a;
			}

			var wrongGuess = 0;
			if(!Hangapp.isGuessedLetter(ltr)) {
				Hangapp.Data.guessedLetters.push(ltr);
				for(var t = 0; t < Hangapp.Data.answer.length; t++) {
					if(ltr == Hangapp.Data.answer[t]) {
						document.getElementById('answer-' + t).innerHTML = ltr;
						Hangapp.Data.guessedWord[t] = ltr;
					}
					else {
						wrongGuess++;
					}
					document.getElementById('guess-' + ltr).style.display = 'none';
				}
				if(wrongGuess == Hangapp.Data.answer.length) {
					Hangapp.Data.guesses--;
					svgAnimator(Hangapp.Data.guesses);
				}
				if(Hangapp.Data.guesses == 0) {
					Hangapp.lose();
				}
				else if(Hangapp.Data.answer == Hangapp.guessedWordStr()) {
					Hangapp.win();
				}
			}
			saveData();
		}
	},
	win: function() {
		document.getElementById('win-lose').innerHTML = 'You win! The word was <span>' + Hangapp.Data.answer +'</span>!';
		Hangapp.Data.wins++;
		Hangapp.endGame();
	},
	lose: function() {
		document.getElementById('win-lose').innerHTML = 'You lose! The word was <span>' + Hangapp.Data.answer +'</span>!';
		Hangapp.Data.losses++;
		Hangapp.endGame();
	},
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
		Nav.init();
		loadData();
		document.getElementById('difficulty').innerHTML = 'Difficulty: ' + Hangapp.Data.difficulty;
		setStyle(Hangapp.Data.style);
		Hangapp.attachEventHandlers();
		if(!Hangapp.hasGuessed()) {
			Hangapp.beginGame();
		} else {
			Hangapp.loadGame();
		}
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
setInterval(Hangapp.cacheWords, 700);
window.onload = Hangapp.init;
