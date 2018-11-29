function loadJSON(path, success, error) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				if (success)
					success(JSON.parse(xhr.responseText));
			} else {
				if (error)
					error(xhr);
			}
		}
	};
	xhr.open("GET", path, true);
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
		console.log("Sorry, your browser does not support Web Storage...");
		return false;
	}
}
var HangappData = {
	style: "day",
	wins: 0,
	losses: 0,
	words: [],
	definitions: [],
}
function saveData() {
	if (hasLocalStorage()) {
		localStorage.setItem("HangappData", JSON.stringify(HangappData));
	}
}
function loadData() {
	if(localStorage.getItem("HangappData") !== null) {
		var d = localStorage.getItem("HangappData");
		HangappData = JSON.parse(d);
		Hangman.wins = HangappData.wins;
		Hangman.losses = HangappData.losses;
	}
}
var Hangman = {
	wins: 0,
	losses: 0,
	guesses: 10,
	difficulty: "Easy",
	inProgress: false,
	answer: "",
	guessedWord: [],
	guessedLetters: [],
	def: "",
	cacheDef: "",
	isDayTheme: function() {
		if(HangappData.style == "day") {
			return true;
		} else {
			return false;
		}
	},
	getNumberOfGuesses: function() {
		if(this.difficulty == "Easy") {
			return 10;
		}
		else if(this.difficulty == "Medium") {
			return 7;
		}
		else {
			return 4;
		}
	},
	toggleDifficultyCheck: function() {
		// player has guessed something already
		if(Hangman.inProgress) {
			var c = confirm("Changing difficulty in the middle of game will restart. Are you sure?");
			if(c) {
				Hangman.toggleDifficulty();
				Hangman.beginGame();
			}
		}
		// player hasn't yet guessed anything
		// don't start new game
		else {
			Hangman.toggleDifficulty();
		}
	},
	toggleDifficulty: function() {
		highlightEffect("difficulty", !Hangman.isDayTheme(), 500);
		if(this.difficulty == "Easy") {
			this.difficulty = "Medium";
		}
		else if(this.difficulty == "Medium") {
			this.difficulty = "Hard";
		}
		else {
			this.difficulty = "Easy";
		}
		Hangman.guesses = Hangman.getNumberOfGuesses();
		document.getElementById("difficulty").innerHTML = "Difficulty: " + this.difficulty;
		Hangman.drawFrame();
	},
	chooseDifficulty: function(difficulty) {
		if(Hangman.inProgress) {
			var c = confirm("Changing difficulty in the middle of game will restart. Are you sure?");
			if(c) {
				this.difficulty = difficulty;
				Hangman.guesses = Hangman.getNumberOfGuesses();
				document.getElementById("difficulty").innerHTML = "Difficulty: " + this.difficulty;
				Hangman.drawFrame();
				Hangman.beginGame();
			}
		}
		else {
			this.difficulty = difficulty;
			Hangman.guesses = Hangman.getNumberOfGuesses();
			document.getElementById("difficulty").innerHTML = "Difficulty: " + this.difficulty;
			Hangman.drawFrame();
		}
	},
	drawFrame: function() {
		var frame = 10;
		svgAnimator(frame);
		while(frame >= Hangman.guesses) {
			svgAnimator(frame);
			frame--;
		}
	},
	emptyCache: function() {
		if (hasLocalStorage()) {
			var c = confirm("This will clear your score and all saved words and definitions. Are you sure?");
			if(c) {
				localStorage.removeItem("HangappData");
				Hangman.wins = 0;
				Hangman.losses = 0;
				HangappData.wins = 0;
				HangappData.losses = 0;
				HangappData.words = [];
				HangappData.definitions = [];
			}
			// update screen
			document.getElementById("nav-cached-words").innerHTML = "Cached Words: " + HangappData.words.length;
			Hangman.printScore();
		}
	},
	cacheWords: function() {
		var online = navigator.onLine;
		if(online) {
			// cache limited number of words
			if(HangappData.words.length < 50) {
				var w = Word_List.getRandomWord();
				Hangman.getDef(w, true);
				setTimeout(function() {
					if(Hangman.cacheDef != "") {
						// found a word with a definition!
						HangappData.words.push(w);
						HangappData.definitions.push(Hangman.cacheDef);
						highlightEffect("nav-cached-words", !Hangman.isDayTheme(), 200);
						saveData();
						document.getElementById("nav-cached-words").innerHTML = "Cached Words: " + HangappData.words.length;
					}
				}, 500);
			}
		}
	},
	guessedWordStr: function() {
		return Hangman.guessedWord.toString().replace(/,/g, '');
	},
	chooseWord: function() {
		// no words in cache
		if(HangappData.words == "") {
			Hangman.answer = Word_List.getRandomWord();
			for(var x = 0; x < Hangman.answer.length; x++) {
				Hangman.guessedWord[x] = " ";
			}
		}
		// words in cache
		else {
			Hangman.answer = HangappData.words[0];
			Hangman.def = HangappData.definitions[0];
			HangappData.words.splice(0, 1);
			HangappData.definitions.splice(0, 1);
			saveData();
		}
	},
	placeBlanks: function() {
		// clear the value on the page
		document.getElementById("word").innerHTML = "";
		// create a span with an underscore for each character of the answer
		for(var i = 0; i < Hangman.answer.length; i++) {
			var node = document.createElement("SPAN");
			node.setAttribute("id", "answer-" + i);
			var textNode = document.createTextNode("_");
			node.appendChild(textNode);
			document.getElementById("word").appendChild(node);
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
						def += "...";
					}
					if(toCache) {
						Hangman.cacheDef = type + ": " + def;
					}
					else {
						Hangman.def = type + ": " + def;
					}
				}
				// couldn't get a definition! :(
				catch(err) {
					if(toCache) {
						Hangman.cacheDef = "";
					}
					else {
						Hangman.def = "";
					}
				}
			}, function(xhr) {
				Hangman.def = "Error";
			});
		} else {
			Hangman.cacheDef = "";
			Hangman.def = "User offline. Reconnect to get definitions.";
		}
	},
	isGuessedLetter: function(ltr) {
		for(var u = 0; u < Hangman.guessedLetters.length; u++) {
			if(ltr == Hangman.guessedLetters[u]) {
				return true;
			}
		}
		return false;
	},
	guess: function(a) {
		// game has started
		Hangman.inProgress = true;
		// click guess
		try {
			var ltr = this.innerHTML.toLowerCase();
		}
		// keyboard guess
		catch (e) {
			var ltr = a;
		}

		// count whether EVERY letter DOESN'T match the guess
		var wrongGuess = 0;
		// skip previously guessed letters
		if(!Hangman.isGuessedLetter(ltr)) {
			// add guessed letter to array of guessedLetters
			Hangman.guessedLetters.push(ltr);
			for(var t = 0; t < Hangman.answer.length; t++) {
				// match found, update screen
				if(ltr === Hangman.answer[t]) {
					document.getElementById("answer-" + t).innerHTML = ltr;
					Hangman.guessedWord[t] = ltr;
				}
				// not a match
				else {
					wrongGuess++;
				}
				// hide button
				document.getElementById("guess-" + ltr).style.display = "none";
			}
			// NO matches found, decrement number of guesses remaining
			if(wrongGuess == Hangman.answer.length) {
				Hangman.guesses--;
				svgAnimator(Hangman.guesses);
			}
			// check if game has ended
			if(Hangman.answer == Hangman.guessedWordStr() && Hangman.guesses > 0) {
				Hangman.win();
			}
			else if(Hangman.guesses == 0) {
				Hangman.lose();
			}
		}
	},
	win: function() {
		document.getElementById("win-lose").innerHTML = "You win! The word was <span>" + Hangman.answer +"</span>!";
		Hangman.wins++;
		Hangman.endGame();
	},
	lose: function() {
		document.getElementById("win-lose").innerHTML = "You lose! The word was <span>" + Hangman.answer +"</span>!";
		Hangman.losses++;
		Hangman.endGame();
	},
	endGame: function() {
		Hangman.inProgress = false;
		HangappData.wins = Hangman.wins;
		HangappData.losses = Hangman.losses;
		saveData();
		document.getElementById("definition").innerHTML = Hangman.def;
		Hangman.printScore();
		fadeOutEffect("game-screen");
		fadeInEffect("end-screen");
		document.getElementById("end-screen").style.display = "inline";
		document.getElementById("new-game").children[0].disabled = false;
	},
	printScore: function() {
		document.getElementById("score-wins").innerHTML = "Wins: " + Hangman.wins;
		document.getElementById("score-losses").innerHTML = "Losses: " + Hangman.losses;
		document.getElementById("nav-wins").innerHTML = "Wins: " + Hangman.wins;
		document.getElementById("nav-losses").innerHTML = "Losses: " + Hangman.losses;
	},
	showGuessedLetters: function() {
		var guessedLetterChildren = document.getElementById("guessed-letters").children;
		for(var i = 0; i < guessedLetterChildren.length; i++) {
			guessedLetterChildren[i].style.display = "inline";
		}
	},
	beginGame: function() {
		Hangman.inProgress = false;
		fadeOutEffect("end-screen");
		fadeInEffect("game-screen");
		Hangman.def = "";
		Hangman.printScore();
		Hangman.chooseWord();
		Hangman.getDef(Hangman.answer, false);
		Hangman.guesses = Hangman.getNumberOfGuesses();
		Hangman.drawFrame();
		Hangman.placeBlanks();
		Hangman.showGuessedLetters();
		Hangman.guessedWord = [];
		Hangman.guessedLetters = [];
		// disable the new game button from the end screen
		document.getElementById("new-game").children[0].disabled = true;
		// update the link for the end screen
		document.getElementById("citation").setAttribute("href", "https://www.merriam-webster.com/dictionary/" + Hangman.answer + "/");
	},
	init: function() {
		Nav.init();
		loadData();
		setStyle(HangappData.style);
		Hangman.attachEventHandlers();
		Hangman.beginGame();
	},
	attachEventHandlers: function() {
		// keyboard input
		document.addEventListener('keydown', function(event) {
			var pattern = /^[a-z]/;
			// letter
			if(event.key.match(pattern)) {
				Hangman.guess(event.key);
				Nav.close();
			}
			// new game
			else if(event.key == "Enter" || event.key == "N") {
				if(Hangman.inProgress) {
					var c = confirm("Pressing enter starts a new game. Do you wish to continue?");
					if(c) {
						Hangman.beginGame();
					}
				} else {
					Hangman.beginGame();
				}
			}
			// Dark theme
			else if(event.key == "D") {
				setStyle("night");
			}
			// Light theme
			else if(event.key == "L") {
				setStyle("day");
			}
			// Easy difficulty
			else if(event.key == "E") {
				Hangman.chooseDifficulty("Easy");
			}
			// Medium difficulty
			else if(event.key == "M") {
				Hangman.chooseDifficulty("Medium");
			}
			// Hard difficulty
			else if(event.key == "H") {
				Hangman.chooseDifficulty("Hard");
			}
		});

		// close the nav by tapping anywhere else
		var body = document.getElementById("main");
		var except = document.getElementById("openbtn");

		body.addEventListener("click", function () {
			Nav.close();
			}, false);
		except.addEventListener("click", function (ev) {
			Nav.toggle();
			ev.stopPropagation();
		}, false);

		var guessedLetters = document.getElementById("guessed-letters");

		for(var i = 0; i < guessedLetters.childElementCount; i++) {
			var btn = guessedLetters.children[i];
			var ltr = (btn.innerHTML).toLowerCase();
			btn.setAttribute("id", "guess-" + ltr);
			btn.onclick = Hangman.guess;
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
	if(Hangman.isDayTheme()) {
		setStyle("night");
	} else {
		setStyle("day");
	}
}
function setStyle(s) {
	highlightEffect("theme", Hangman.isDayTheme(), 500);
	document.getElementById("day-night-stylesheet").setAttribute("href", "assets/css/" + s + ".css");
	var str = s.charAt(0).toUpperCase() + s.substr(1);
	document.getElementById("theme").innerHTML = "Theme: " + str;
	HangappData.style = s
	saveData();
}
var Nav = {
  start: 0,
  end: 250,
  isOpening: false,
  isClosing: false,
  effect: "",
	init: function() {
		// ensure that first click opens the nav bar
		document.getElementById("mySidebar").style.width = "0px";
	},
  open: function() {
	var target = document.getElementById("mySidebar");
	var counter = parseInt(target.style.width);
	Nav.isOpening = true;
	Nav.isClosing = false;
	Nav.effect = setInterval(function() {
		if(counter < Nav.end) {
			counter+=3;
			target.style.width = counter + "px";
		} else {
			// is open
			clearInterval(Nav.effect);
			target.style.width = Nav.end + "px";
			Nav.isOpening = false;
		}
	}, 2);
  },
  close: function() {
    var target = document.getElementById("mySidebar");
    var counter = parseInt(target.style.width);
		Nav.isOpening = false;
		Nav.isClosing = true;
    Nav.effect = setInterval(function() {
      if(counter > Nav.start) {
          counter-=3;
          target.style.width = counter + "px";
      } else {
          // is closed
          clearInterval(Nav.effect);
          target.style.width = Nav.start + "px";
          Nav.isClosing = false;
      }
    }, 2);
  },
  toggle: function() {
    var target = document.getElementById("mySidebar");
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
	document.getElementById(target).style.display = "none";
}
function fadeInEffect(target) {
	document.getElementById(target).style.display = "inline";
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
		highlightTarget.style.color = "white";
		setTimeout(function() {
			highlightTarget.style.color = "#818181";
		}, length);
	} else {
		highlightTarget.style.color = "black";
		setTimeout(function() {
			highlightTarget.style.color = "#7E7E7E";
		}, length);
	}
}
// start caching words
setInterval(Hangman.cacheWords, 1000);
window.onload = Hangman.init;
