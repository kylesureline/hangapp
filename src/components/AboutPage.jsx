import React from 'react';

export const AboutPage = () => (
  <div className="page page--about">
    <h2 className="page__title">About</h2>
    <p>Hangapp is a simple hangman game, built by <a className="link" href="https://kylesureline.com" target="_blank">Kyle Scheuerlein</a> using React and Webpack. It's tracked on GitHub and includes a comprehensive testing suite written using Jest. The backend is a firebase database and it's deployed on Heroku.</p>
    <h3>Features</h3>
    <ul>
      <li>Signup/Login</li>
      <li>Extensive word bank (thanks <a className="link" href="https://github.com/TimTCrouch/WordList-JS" target="_blank">TimTCrouch</a>!)</li>
      <li>Definitions retrieved from Merriam Webster</li>
      <li>Animated SVG that draws as you play!</li>
      <li>Light and dark theme</li>
      <li>App dashboard with stats and settings</li>
      <li><strike>Playable offline</strike> (for now)</li>
    </ul>
    <h3>Feedback</h3>
    <p>I'd love to hear what you think! Email me <a className="link" href="mailto:kyle@kylesureline.com">here</a>!</p>
  </div>
);

export default AboutPage;
