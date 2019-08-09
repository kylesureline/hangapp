import React from 'react';
import { connect } from 'react-redux';
import { setTheme, setDifficulty } from '../actions/settings';

export class SettingsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'light',
      difficulty: 'easy',
      error: ''
    };
  }
  onThemeChange = (e) => {
    const newTheme = e.target.value;
    this.setState({ 'theme': newTheme });
    this.props.setTheme(newTheme);
  };
  onDifficultyChange = (e) => {
    const newDifficulty = e.target.value;
    this.setState({ 'difficulty': newDifficulty });
    this.props.setDifficulty(newDifficulty);
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <h3>Settings</h3>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <div>
          <label htmlFor="theme">Theme:</label><br />
  				<input
            id="light"
            type="radio"
            name="theme"
            value="light"
            checked={this.state.theme === 'light'}
            onChange={this.onThemeChange} />
          <label htmlFor="light">Light</label>
  				<input
            id="dark"
            type="radio"
            name="theme"
            value="dark"
            checked={this.state.theme === 'dark'}
            onChange={this.onThemeChange} />
          <label htmlFor="dark">Dark</label>
        </div>
        <br /><br />
        <div>
          <label htmlFor="difficulty">Difficulty:</label><br />
          <input
            id="easy"
            type="radio"
            name="difficulty"
            value="easy"
            checked={this.state.difficulty === 'easy'}
            onChange={this.onDifficultyChange} />
          <label htmlFor="easy">Easy</label>
          <input
            id="medium"
            type="radio"
            name="difficulty"
            value="medium"
            checked={this.state.difficulty === 'medium'}
            onChange={this.onDifficultyChange} />
          <label htmlFor="medium">Medium</label>
          <input
            id="hard"
            type="radio"
            name="difficulty"
            value="hard"
            checked={this.state.difficulty === 'hard'}
            onChange={this.onDifficultyChange} />
          <label htmlFor="hard">Hard</label>
        </div>
      </form>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  setTheme: (theme) => dispatch(setTheme(theme)),
  setDifficulty: (difficulty) => dispatch(setDifficulty(difficulty))
});

export default connect(undefined, mapDispatchToProps)(SettingsForm);
