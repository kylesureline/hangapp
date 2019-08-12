import React from 'react';
import { connect } from 'react-redux';
import { setTheme, setDifficulty } from '../../actions/settings';

export class SettingsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };
  }
  onThemeChange = (e) => {
    const newTheme = e.target.value;
    this.props.setTheme(newTheme);
  };
  onDifficultyChange = (e) => {
    if((this.props.settings.difficulty === 'easy' && this.props.guessesRemaining < 10) ||
    (this.props.settings.difficulty === 'hard' && this.props.guessesRemaining < 7)) {
      this.setState({
        error: 'Changing difficulty will only affect subsequent games.'
      });
    }
    const newDifficulty = e.target.value;
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
            checked={this.props.settings.theme === 'light'}
            onChange={this.onThemeChange} />
          <label htmlFor="light">Light</label>
  				<input
            id="dark"
            type="radio"
            name="theme"
            value="dark"
            checked={this.props.settings.theme === 'dark'}
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
            checked={this.props.settings.difficulty === 'easy'}
            onChange={this.onDifficultyChange} />
          <label htmlFor="easy">Easy</label>
          <input
            id="hard"
            type="radio"
            name="difficulty"
            value="hard"
            checked={this.props.settings.difficulty === 'hard'}
            onChange={this.onDifficultyChange} />
          <label htmlFor="hard">Hard</label>
        </div>
      </form>
    );
  }
};

const mapStateToProps = (state) => ({
  settings: state.settings,
  guessesRemaining: state.player.guessesRemaining
});

const mapDispatchToProps = (dispatch) => ({
  setTheme: (theme) => dispatch(setTheme(theme)),
  setDifficulty: (difficulty) => dispatch(setDifficulty(difficulty))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsForm);
