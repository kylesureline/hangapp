import React from 'react';
import { Navigation } from './Navigation';
import { Stats } from './Stats';
import { Social } from './Social';

export const Sidebar = () => (
  <div className="sidebar">
    <Navigation />
    {/* <form>
      <div className="form-left">
        <label className="setting" htmlFor="theme">Theme:</label>
        <input id="day" type="radio" name="theme" value="day" checked />
        <label htmlFor="day">Day</label>
        <input id="night" type="radio" name="theme" value="night" />
        <label htmlFor="night">Night</label><br />
      </div>
      <div className="form-right">
        <label className="setting" htmlFor="difficulty">Difficulty:</label>
        <input id="Easy" type="radio" name="difficulty" value="Easy" checked />
        <label htmlFor="Easy">Easy</label>
        <input id="Medium" type="radio" name="difficulty" value="Medium" />
        <label htmlFor="Medium">Medium</label>
        <input id="Hard" type="radio" name="difficulty" value="Hard" />
        <label htmlFor="Hard">Hard</label>
      </div>
    </form> */}

    <div className="nav-info">
      <Stats />
      <Social />
    </div>
  </div>
);
