import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firebase } from '../firebase/firebase';
import { startSignup } from '../actions/auth';

export class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }
  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.startSignup(email, password).catch((error) => {
      this.setState(({ error }));
    });
  };
  render() {
    return (
      <form className="form form--login" onSubmit={this.onSubmit}>
        {!!this.state.error.message && <p className="form__error">{
          this.state.error.message.includes('email') ? (
            'Please enter a valid email.'
          ) : (
            'Please enter a password.'
          )
        }</p>}
        <input
          className="text-input"
          type="email"
          name="email"
          placeholder="Email"
          autoFocus
          value={this.state.email}
          onChange={this.onInputChange}
        />
        <input
          className="text-input"
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.onInputChange}
        />
        <div className="input-group input-group--centered-column">
          <button className="button input-group__item input-group__item--column">Signup</button>
          <Link className="button button--secondary input-group__item input-group__item--column" to={'/'}>Back</Link>
        </div>
      </form>
    );
  }
};

const mapDispatchToProps = (dispatch) => ({
  startSignup: (email, password) => dispatch(startSignup(email, password))
})

export default connect(undefined, mapDispatchToProps)(Signup);
