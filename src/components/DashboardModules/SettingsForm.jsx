import React from 'react';
import { connect } from 'react-redux';
import { setTheme } from '../../actions/settings';
import { setGuessesRemaining } from '../../actions/player';

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
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <h3 className="module__title">Settings</h3>
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
      </form>
    );
  }
};

const mapStateToProps = (state) => ({
  settings: state.settings,
  guessesRemaining: state.player.guessesRemaining,
  guessedLetters: state.player.guessedLetters
});

const mapDispatchToProps = (dispatch) => ({
  setTheme: (theme) => dispatch(setTheme(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsForm);
