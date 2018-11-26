# Hangapp

A simple Hangman game, built as a Progressive Web App. Playable [here](https://kylesureline.github.io/hangapp/). Also featured on [Appsco.pe](https://appsco.pe/app/hangapp)!

## Features

- Extensive word bank, curtesy of https://github.com/TimTCrouch/WordList-JS.
- Wins/Losses stored in localStorage
- Day/Night mode color schemes
- Can be added to the home screen for offline use (service workers to cache necessary files)
- Definitions are retrieved via API from Merriam-Webster.com
- While online, some definitions will be cached for offline use, else no definition will be provided

### Changelog

**Version 1.19**

- Change: Make buttons taller
- Change: Adjust how theme/difficulty are changed

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
