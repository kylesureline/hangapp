import React from 'react';
import { connect } from 'react-redux';
import { startSetTheme } from '../../actions/settings';

export class SettingsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: ''
    };
  }
  onThemeChange = (e) => {
    const newTheme = e.target.value;
    this.props.startSetTheme(newTheme);
  };
  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        <h3 className="module__title">Settings</h3>
        <fieldset className="form__section">
          <legend>Theme</legend>
          <div className="option-group">
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

        </fieldset>
      </form>
    );
  }
};

const mapStateToProps = (state) => ({
  settings: state.settings
});

const mapDispatchToProps = (dispatch) => ({
  startSetTheme: (theme) => dispatch(startSetTheme(theme))
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsForm);
