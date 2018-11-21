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

var hangman = {
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
		if( hangman.difficulty == "Easy") {
			return 10;
		} else if( hangman.difficulty == "Medium") {
			return 7;
		} else {
			return 4;
		}
	},
	toggleDifficultyCheck: function() {
		// player has guessed something already
		if(hangman.inProgress) {
			var c = confirm("Changing difficulty in the middle of game will restart. Are you sure?");
			if( c == true) {
				hangman.toggleDifficulty();
				hangman.beginGame();
			}
		}
		// player hasn't yet guessed anything
		// don't start new game
		else {
			hangman.toggleDifficulty();
		}
	},
	toggleDifficulty: function() {
		if(hangman.difficulty == "Easy") {
			hangman.difficulty = "Medium";
		} else if( hangman.difficulty == "Medium") {
			hangman.difficulty = "Hard";
		} else {
			hangman.difficulty = "Easy";
		}
		hangman.guesses = hangman.getNumberOfGuesses();
		document.getElementById("difficulty").innerHTML = hangman.difficulty;
		hangman.drawFrame();
	},
	drawFrame: function() {
		var frame = 10;
		svgAnimator.draw(frame);
		while(frame >= hangman.guesses) {
			svgAnimator.draw(frame);
			frame--;
		}
	},
	wordBankWords: [],
	wordBankDefs: [],
	cacheWords: function() {
		// cache 30 words at a time
		if(hangman.wordBankWords.length < 50) {
			var w = Word_List.getRandomWord();
			hangman.getDef(w, true);
			setTimeout( function() {
				if(hangman.cacheDef != "") {
					// found a word with a definition!
					hangman.wordBankWords.push(w);
					hangman.wordBankDefs.push(hangman.cacheDef);
				}
			}, 500);
		}
		hangman.saveWordBank();
		document.getElementById("nav-cached-words").innerHTML = "Cached Words: " + hangman.wordBankWords.length;
	},
	saveWordBank: function () {
		if (typeof(Storage) !== "undefined") {
			localStorage.setItem("wordBankWords", JSON.stringify(hangman.wordBankWords));
			localStorage.setItem("wordBankDefs", JSON.stringify(hangman.wordBankDefs));
		} else {
			console.log("Sorry, your browser does not support Web Storage...");
		}
	},
	guessedWordStr: function() {
		return hangman.guessedWord.toString().replace(/,/g, '');
	},
	chooseWord: function() {
		if(hangman.wordBankWords == "") {
			hangman.answer = Word_List.getRandomWord();
			for( var x = 0; x < hangman.answer.length; x++ ) {
				hangman.guessedWord[x] = " ";
			}
		} else {
			hangman.answer = hangman.wordBankWords[0];
			hangman.def = hangman.wordBankDefs[0];
			hangman.wordBankWords.splice(0, 1);
			hangman.wordBankDefs.splice(0, 1);
			hangman.saveWordBank();
		}
	},
	placeBlanks: function() {
		document.getElementById("word").innerHTML = "";
		for( var i = 0; i < hangman.answer.length; i++ ) {
			var node = document.createElement("SPAN");
			node.setAttribute("id", "answer-" + i);
			var textNode = document.createTextNode("_");
			node.appendChild(textNode);
			if(hangman.answer[i] == " ") {
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
			var _json;
			loadJSON(apiURL, function(data) {
				_json = data;
				// got a definition! :)
				try {
					var type = _json[0].fl;
					var def = _json[0].shortdef[0];
					if (def.length > 250) {
						def = def.substring(0, 250);
						def += "...";
					}
					if(toCache) {
						hangman.cacheDef = type + ": " + def;
					} else {
						hangman.def = type + ": " + def;
					}
				}
				// couldn't get a definition! :(
				catch(err) {
					if(toCache) {
						hangman.cacheDef = "";
					} else {
						hangman.def = "";
					}
				}
			}, function(xhr) {
				hangman.def = "Error";
			});
		} else {
			hangman.cacheDef = "";
		}
	},
	isGuessedLetter: function(ltr) {
		for( var u = 0; u < hangman.guessedLetters.length; u++ ) {
			if( ltr == hangman.guessedLetters[u] ) {
				return true;
			}
		}
		return false;
	},
	guess: function() {
		hangman.inProgress = true;
		var ltr = this.innerHTML.toLowerCase();
		var wrongGuess = 0;
		
		if( !hangman.isGuessedLetter(ltr) ) {
			hangman.guessedLetters.push(ltr);
			for(var t = 0; t < hangman.answer.length; t++ ) {
				if( ltr === hangman.answer[t] ) {
					document.getElementById("answer-" + t).innerHTML = ltr;
					hangman.guessedWord[t] = ltr;
				} else {
					wrongGuess++;
				}
				document.getElementById("guess-" + ltr).style.display = "none";
			}
			if( wrongGuess == hangman.answer.length ) {
				hangman.guesses--;
				svgAnimator.draw(hangman.guesses);
			}
			if( hangman.answer == hangman.guessedWordStr() && hangman.guesses > 0) {
				hangman.win();
			} else if(hangman.guesses == 0) {
				hangman.lose();
			}
		}
	},
	win: function() {
		document.getElementById("win-lose").innerHTML = "You win! The word was <span>" + hangman.answer +"</span>!";
		hangman.wins++;
		hangman.endGame();
	},
	lose: function() {
		document.getElementById("win-lose").innerHTML = "You lose! The word was <span>" + hangman.answer +"</span>!";
		hangman.losses++;
		hangman.endGame();
	},
	endGame: function() {
		hangman.inProgress = false;
		if (typeof(Storage) !== "undefined") {
			localStorage.setItem("wins", hangman.wins);
			localStorage.setItem("losses", hangman.losses);
		} else {
			console.log("Sorry, your browser does not support Web Storage...");
		}
		document.getElementById("definition").innerHTML = hangman.def;
		hangman.printScore();
		fadeOutEffect("game-screen");
		fadeInEffect("end-screen");
		document.getElementById("end-screen").style.display = "inline";
		document.getElementById("new-game").children[0].disabled = false;
	},
	printScore: function() {
		document.getElementById("score-wins").innerHTML = "Wins: " + hangman.wins;
		document.getElementById("score-losses").innerHTML = "Losses: " + hangman.losses;	
		document.getElementById("nav-wins").innerHTML = "Wins: " + hangman.wins;
		document.getElementById("nav-losses").innerHTML = "Losses: " + hangman.losses;
	},
	showGuessedLetters: function() {
		var guessedLetterChildren = document.getElementById("guessed-letters").children;
		for( var i = 0; i < guessedLetterChildren.length; i++ ) {
			guessedLetterChildren[i].style.display = "inline";
		}
	},
	beginGame: function() {
		closeNav();
		fadeOutEffect("end-screen");
		fadeInEffect("game-screen");
		hangman.def = "";
		hangman.printScore();
		hangman.chooseWord();
		hangman.getDef(hangman.answer, false);
		hangman.guesses = hangman.getNumberOfGuesses();
		hangman.drawFrame();
		hangman.placeBlanks();
		hangman.showGuessedLetters();
		hangman.guessedWord = [];
		hangman.guessedLetters = [];
		document.getElementById("new-game").children[0].disabled = true;
		document.getElementById("citation").setAttribute("href", "https://www.merriam-webster.com/dictionary/" + hangman.answer + "/");
	},
	init: function() {
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
				hangman.wins = Number(w);
			} else {
				hangman.wins = 0;
			}
			if(localStorage.getItem("losses") !== null) {
				var l = localStorage.getItem("losses");
				hangman.losses = Number(l);
			} else {
				hangman.losses = 0;
			}
			if(localStorage.getItem("wordBankWords") !== null && localStorage.getItem("wordBankDefs") !== null) {
				var c = localStorage.getItem("wordBankWords");
				var d = localStorage.getItem("wordBankDefs");
				hangman.wordBankWords = JSON.parse(c);
				hangman.wordBankDefs = JSON.parse(d);
			}
		} else {
			console.log("Sorry, your browser does not support Web Storage...");
		}
		hangman.attachEventHandlers();
		hangman.beginGame();
	},
	attachEventHandlers: function() {
		var body = document.getElementById("main");
		var except = document.getElementById("openbtn");

		body.addEventListener("click", function () {
			closeNav();
			}, false);
		except.addEventListener("click", function (ev) {
			toggleNav();
			ev.stopPropagation();
		}, false);
		
		var guessedLetters = document.getElementById("guessed-letters");
		
		for(var i = 0; i < guessedLetters.childElementCount; i++) {
			var btn = guessedLetters.children[i];
			var ltr = (btn.innerHTML).toLowerCase();
			btn.setAttribute("id", "guess-" + ltr);
			btn.onclick = hangman.guess;
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

function isLetter(str) {
	return str.length === 1 && str.match(/[a-z]/i);
}

function setStyle(s) {
	document.getElementById("day-night-stylesheet").setAttribute("href", "assets/css/" + s + ".css");
	if(typeof(Storage) !== "undefined") {
		localStorage.setItem("style", s);
	} else {
		console.log("Sorry, your browser does not support Web Storage...");
	}
}

function openNav() {
	document.getElementById("mySidebar").style.width = "250px";
    var slideTarget = document.getElementById("mySidebar");
    var counter = 0;
    slideTarget.style.width = counter + "px";
    var slideEffect = setInterval(function() {
        if( counter < 250 ) {
            counter+=2;
            slideTarget.style.width = counter + "px";
        } else {
            clearInterval(slideEffect);
        }
    }, 2);
}
function closeNav() {
    var slideTarget = document.getElementById("mySidebar");
    // only try to close if it is open
    if(parseInt(slideTarget.style.width) > 0) {
        var counter = 250;
        slideTarget.style.width = counter + "px";
        var slideEffect = setInterval(function() {
            if( counter > 0 ) {
                counter-=2;
                slideTarget.style.width = counter + "px";
            } else {
                clearInterval(slideEffect);
                document.getElementById("mySidebar").style.width = "0px";
            }
        }, 2);
    }
}
function toggleNav() {
	var mySidebar = document.getElementById("mySidebar");
	if(mySidebar.style.width == "250px") {
		closeNav();
	} else {
		openNav();
	}
}

function fadeOutEffect(target) {
	document.getElementById(target).style.opacity = 0;
	document.getElementById(target).style.display = "none";
	/*
	var fadeTarget = document.getElementById(target);
	var counter = 1;
	fadeTarget.style.opacity = counter;
	var fadeEffect = setInterval(function () {
		if (counter > 0.1) {
			counter -= 0.1
			fadeTarget.style.opacity = counter.toFixed(1);
		} else {
			clearInterval(fadeEffect);
			document.getElementById(target).style.display = "none";
		}
	}, 50);
	*/
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
setInterval( hangman.cacheWords, 1000);


window.onload = hangman.init;