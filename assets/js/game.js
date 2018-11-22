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
	getNumberOfGuesses: function() {
		if( Hangman.difficulty == "Easy") {
			return 10;
		} else if( Hangman.difficulty == "Medium") {
			return 7;
		} else {
			return 4;
		}
	},
	toggleDifficultyCheck: function() {
		// player has guessed something already
		if(Hangman.inProgress) {
			var c = confirm("Changing difficulty in the middle of game will restart. Are you sure?");
			if( c == true) {
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
		if(Hangman.difficulty == "Easy") {
			Hangman.difficulty = "Medium";
		} else if( Hangman.difficulty == "Medium") {
			Hangman.difficulty = "Hard";
		} else {
			Hangman.difficulty = "Easy";
		}
		Hangman.guesses = Hangman.getNumberOfGuesses();
		document.getElementById("difficulty").innerHTML = Hangman.difficulty;
		Hangman.drawFrame();
	},
	drawFrame: function() {
		var frame = 10;
		svgAnimator.draw(frame);
		while(frame >= Hangman.guesses) {
			svgAnimator.draw(frame);
			frame--;
		}
	},
	emptyCache: function() {
		if (typeof(Storage) !== "undefined") {
			var c = confirm("This will clear your score and all saved words and definitions. Are you sure?");
			if(c) {
				localStorage.removeItem("wins");
				Hangman.wins = 0;
				localStorage.removeItem("losses");
				Hangman.losses = 0;
				localStorage.removeItem("wordBankWords");
				Hangman.wordBankWords = [];
				localStorage.removeItem("wordBankDefs");
				Hangman.wordBankDefs = [];
			}
			// update screen
			document.getElementById("nav-cached-words").innerHTML = "Cached Words: " + Hangman.wordBankWords.length;
			Hangman.printScore();
		} else {
			console.log("Sorry, your browser does not support Web Storage...");
		}
	},
	wordBankWords: [],
	wordBankDefs: [],
	cacheWords: function() {
		var online = navigator.onLine;
		if(online) {
			// cache limited number of words
			if(Hangman.wordBankWords.length < 50) {
				var w = Word_List.getRandomWord();
				Hangman.getDef(w, true);
				setTimeout( function() {
					if(Hangman.cacheDef != "") {
						// found a word with a definition!
						Hangman.wordBankWords.push(w);
						Hangman.wordBankDefs.push(Hangman.cacheDef);
					}
				}, 500);
			}
			Hangman.saveWordBank();
		}
		document.getElementById("nav-cached-words").innerHTML = "Cached Words: " + Hangman.wordBankWords.length;
	},
	saveWordBank: function () {
		if (typeof(Storage) !== "undefined") {
			localStorage.setItem("wordBankWords", JSON.stringify(Hangman.wordBankWords));
			localStorage.setItem("wordBankDefs", JSON.stringify(Hangman.wordBankDefs));
		} else {
			console.log("Sorry, your browser does not support Web Storage...");
		}
	},
	guessedWordStr: function() {
		return Hangman.guessedWord.toString().replace(/,/g, '');
	},
	chooseWord: function() {
		if(Hangman.wordBankWords == "") {
			Hangman.answer = Word_List.getRandomWord();
			for( var x = 0; x < Hangman.answer.length; x++ ) {
				Hangman.guessedWord[x] = " ";
			}
		} else {
			Hangman.answer = Hangman.wordBankWords[0];
			Hangman.def = Hangman.wordBankDefs[0];
			Hangman.wordBankWords.splice(0, 1);
			Hangman.wordBankDefs.splice(0, 1);
			Hangman.saveWordBank();
		}
	},
	placeBlanks: function() {
		document.getElementById("word").innerHTML = "";
		for( var i = 0; i < Hangman.answer.length; i++ ) {
			var node = document.createElement("SPAN");
			node.setAttribute("id", "answer-" + i);
			var textNode = document.createTextNode("_");
			node.appendChild(textNode);
			if(Hangman.answer[i] == " ") {
				var b = document.createElement("BR");
				document.getElementById("word").appendChild(b);
			} else {
				document.getElementById("word").appendChild(node);
			}
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
					} else {
						Hangman.def = type + ": " + def;
					}
				}
				// couldn't get a definition! :(
				catch(err) {
					if(toCache) {
						Hangman.cacheDef = "";
					} else {
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
		for( var u = 0; u < Hangman.guessedLetters.length; u++ ) {
			if( ltr == Hangman.guessedLetters[u] ) {
				return true;
			}
		}
		return false;
	},
	guess: function() {
		Hangman.inProgress = true;
		var ltr = this.innerHTML.toLowerCase();
		var wrongGuess = 0;
		
		if( !Hangman.isGuessedLetter(ltr) ) {
			Hangman.guessedLetters.push(ltr);
			for(var t = 0; t < Hangman.answer.length; t++ ) {
				if( ltr === Hangman.answer[t] ) {
					document.getElementById("answer-" + t).innerHTML = ltr;
					Hangman.guessedWord[t] = ltr;
				} else {
					wrongGuess++;
				}
				document.getElementById("guess-" + ltr).style.display = "none";
			}
			if( wrongGuess == Hangman.answer.length ) {
				Hangman.guesses--;
				svgAnimator.draw(Hangman.guesses);
			}
			if( Hangman.answer == Hangman.guessedWordStr() && Hangman.guesses > 0) {
				Hangman.win();
			} else if(Hangman.guesses == 0) {
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
		if (typeof(Storage) !== "undefined") {
			localStorage.setItem("wins", Hangman.wins);
			localStorage.setItem("losses", Hangman.losses);
		} else {
			console.log("Sorry, your browser does not support Web Storage...");
		}
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
		for( var i = 0; i < guessedLetterChildren.length; i++ ) {
			guessedLetterChildren[i].style.display = "inline";
		}
	},
	beginGame: function() {
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
		document.getElementById("new-game").children[0].disabled = true;
		document.getElementById("citation").setAttribute("href", "https://www.merriam-webster.com/dictionary/" + Hangman.answer + "/");
	},
	init: function() {
		Nav.init();
		if (typeof(Storage) !== "undefined") {
			// day/night mode
			if(localStorage.getItem("style") !== null) {
				var s = localStorage.getItem("style");
				setStyle(s);
			} else {
				setStyle("day"); // default theme
			}
			// wins/losses
			if(localStorage.getItem("wins") !== null) {
				var w = localStorage.getItem("wins");
				Hangman.wins = Number(w);
			} else {
				Hangman.wins = 0;
			}
			if(localStorage.getItem("losses") !== null) {
				var l = localStorage.getItem("losses");
				Hangman.losses = Number(l);
			} else {
				Hangman.losses = 0;
			}
			if(localStorage.getItem("wordBankWords") !== null && localStorage.getItem("wordBankDefs") !== null) {
				var c = localStorage.getItem("wordBankWords");
				var d = localStorage.getItem("wordBankDefs");
				Hangman.wordBankWords = JSON.parse(c);
				Hangman.wordBankDefs = JSON.parse(d);
			}
		} else {
			console.log("Sorry, your browser does not support Web Storage...");
		}
		Hangman.attachEventHandlers();
		Hangman.beginGame();
	},
	attachEventHandlers: function() {
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

var svgAnimator = {
	draw: function(x) {
		if( x == 10 ) {
			for( var i = 0; i < 10; i++ ) {
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
};

function setStyle(s) {
	document.getElementById("day-night-stylesheet").setAttribute("href", "assets/css/" + s + ".css");
	if(typeof(Storage) !== "undefined") {
		localStorage.setItem("style", s);
	} else {
		console.log("Sorry, your browser does not support Web Storage...");
	}
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
			if( counter < Nav.end ) {
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
            if( counter > Nav.start ) {
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
        } else if( parseInt(target.style.width) == Nav.start) {
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

// start caching words
setInterval( Hangman.cacheWords, 1000);


window.onload = Hangman.init;