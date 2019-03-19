# Hangapp

A simple Hangman game, built as a Progressive Web App. Playable [here](https://kylesureline.com/hangapp/). Also featured on [Appsco.pe](https://appsco.pe/app/hangapp) and [Outweb.io](https://outweb.io/1545291231468)!

## Features

- Extensive word bank, curtesy of https://github.com/TimTCrouch/WordList-JS.
- Wins/Losses stored in localStorage
- Day/Night mode color schemes
- Can be added to the home screen for offline use (service workers to cache necessary files)
- Definitions are retrieved via API from Merriam-Webster.com
- While online, some definitions will be cached for offline use, else no definition will be provided

### Changelog

**Version 1.47**

- Track custom events with Woopra

**Version 1.46**

- Add Woopra site analytics

**Version 1.45**

- Fix modal link line height on small devices
- Add button to install the app on Chrome

**Version 1.44**

- Refactoring

**Version 1.43**

- Refactoring
- Use LinkedIn link instead of Twitter
- Display % of cache, rather than # of words

**Version 1.42**

- Link to definition on m-w.com now opens in a new tab

**Version 1.41**

- Change how sidebar slides into view

**Version 1.40**

- Change: If offline, wait 10 seconds before trying to fetch another definition to cache

**Version 1.39**

- Fix: limit cache to 50 words (really)

**Version 1.38**

- Refactor fix for old localStorage format

**Version 1.37**

- Refactor cacheWords() algorithm
- Add fix for old localStorage format

**Version 1.36**

- Fix: Size of nav bar on mobile

**Version 1.35**

- Fix: Display hint on mobile

**Version 1.34**

- Added: The type of word (ie. noun) now displays under the word you're guessing
- Change: Refactored AJAX call to use Fetch API
- Change: Skip words that are 4 letters or shorter

**Version 1.33**

- Change: Nav fits better on smaller screens

**Version 1.32**

- Fix: re-center the new game button on the nav bar

**Version 1.31**

- Change: Minor changes to CSS on the navigation bar

**Version 1.30**

- Change: Remove empty background-modal between sidebar and game screen
- Fix: Quirky behavior involving using the keyboard to start a new game at certain points in the app
- Fix: Choosing the day theme now correctly inserts the "day.css" file, not "light.css" which doesn't exist

**Version 1.29**

- Change: Disable a letter if you've guessed it, rather than hide it
- Change: Add a border to the new game button on the end screen
- Change: Make the sidebar more transparent
- Fix: Don't remove modal while sidebar is open when starting a new game with keydown
- Fix: Starting a new game while offline wasn't updating the number of remaining cached words

**Version 1.28**

- Small tweaks to layout to fix landscape on mobile
- Don't append a p tag to modal for the definition if none available

**Version 1.27**

- Complete rewrite
- HTML
  - Remove IDs cluttering up markup
  - Use semantic HTML Form markup for game settings
  - Load JavaScript file last
- CSS
  - Split into SASS partials to organize
  - Vastly improved flexbox layout for all screens
  - Hide keyboard controls on short screens
- JavaScript
  - Use const and let, not var
  - Nest functions in parent functions
  - Re-organize the order of functions
  - Use separate functions, rather than one Hangapp object with methods
  - Use event handlers, not onClick HTML attributes
  - Insert a modal for the end screen

**Version 1.26**

- Fix: Prevent typing guesses when game has ended
- Add: Confirm with player before allowing "New Game" to proceed during an existing game

**Version 1.25**

- Bug fixes
- Fix slow navigation menu

**Version 1.24**

- Fix displaying which difficulty is set (when loading from save)

**Version 1.23**

- Fix empty cache button

**Version 1.22**

- Add: Save difficulty in localStorage
- Add: Save game state between sessions!

**Version 1.21**

- Add: Instructions for keyboard controls
- Add: Keyboard controls for new game, color theme, and difficulty
- Change: Consolidate localStorage into one key

**Version 1.20**

- Change: Users with physical keyboards can now type their input
- Change: Press enter to start a new game

**Version 1.19**

- Change: Make buttons taller
- Change: Adjust how theme/difficulty are changed
- Change: Indicate when new words are cached for offline play

**Version 1.18**

- Change: GitHub link points to this repo now, rather than old one (duh!)
- Fix: Only cache words if online (double duh!)
- Change: Instead of a blank definition, provide a message alerting the user to reconnect (if they are offline) to get definitions

**Version 1.17**

- Change: Resize link to M-W.com
- Change: Use font-awesome for link icon to GitHub page
- Change: Improve the performance of resizing the window
- Add: Link to clear localStorage

**Version 1.16**

- Change: Use font-awesome for the menu 'burger'
- Change: Use font-awesome for the menu 'x'
- Change: Move link to M-W.com to the bottom
- Change: Resize link to M-W.com

**Version 1.15**

- Fix: Make link color black when using the light theme
- Add: source link for definitions
- Change: Truncate definitions to 250 characters

**Version 1.14.1**

- Added: score, app version, and number of cached words in the nav menu
- Change: Increase localStorage limit to 50 words and definitions
- Change: The word on the game over screen is now a link to the word's definition on Merriam Webster

**Version 1.12**

- Less delay between attempts to retrieve definitions in the background
- Fix: actually use the definitions that have been cached in localStorage
- Change: Increase localStorage limit to 30 words and definitions

**Version 1.11**

- Only attempt to retrieve definitions from api if online

**Version 1.10**

- Make #main slightly less than 100vh to prevent scroll bar from showing on Safari

**Version 1.09**

- Fix changing difficulty on end-screen

**Version 1.08**

- Fix animation for difficulty and new games

**Version 1.07**

- Truncate word definitions if they're too long
- Improve reliability of caching definitions
- Introduced a difficulty setting

**Version 1.06**

- Cache words and definitions in the background
- Resize buttons slightly
- Improve fadeOutEffect() performance

**Version 1.05**

- Change back to Merriam Webster's API

**Version 1.04**

- Use localStorage instead of cookies
- Use Oxford API instead

**Version 1.03**

- Use Merriam Webster's API to include the definition of the word

**Version 1.02**

- Resize font on buttons for mobile

**Version 1.01**

- Use flexbox for the button sizes

**Version 1**

- Change navigation menu to the left side of the screen

**Version 0.9.8.8**

- Add a navigation menu

**Version 0.9.8.7**

- Use buttons to take input instead of device keyboard
- Split view in landscape orientation

**Version 0.9.4**

- Change look of the guess box

**Version 0.9.3**

- Revert to previous service worker (removing old caches wasn't working correctly)

**Version 0.9.2**

- Add day/night css to cache

**Version 0.9.1**

- Resize width of end screen

**Version 0.9**

- Fade out/in between screens
- Remove old caches using service worker

**Version 0.8.9**

- Blur input when game ends

**Version 0.8.8**

- Add end screen

**Version 0.8.7**

- Changed the size of things for mobile
- Put wins/losses on two separate lines
