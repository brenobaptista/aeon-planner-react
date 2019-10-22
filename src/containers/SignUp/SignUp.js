import React, { Component } from 'react';
import axios from 'axios';

import FormError from '../../components/FormError/FormError';
import Spinner from '../../components/Spinner/Spinner';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    passwordAgain: '',
    error: false,
    authLoading: false,
  }

  signUpHandler = async () => {
    try {
      if (this.state.password === this.state.passwordAgain) {
        this.setState({ authLoading: true })
        const data = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        }
        const res = await axios.put('https://trello-api-nodejs.herokuapp.com/signup', data)
        console.log(res)
        this.setState({ authLoading: false })
        this.props.history.push('login');
      }
    } catch {
      this.setState({ 
        error: true,
        authLoading: false
      })
    }
  }

  nameHandler = (event) => this.setState({ name: event.target.value });
  emailHandler = (event) => this.setState({ email: event.target.value });
  passwordHandler = (event) => this.setState({ password: event.target.value });
  passwordAgainHandler = (event) => this.setState({ passwordAgain: event.target.value });

  render() {
    return (
      <div>
        {this.state.authLoading ? <Spinner /> :
          <center>
            <h1 className="margin-t-b">Sign Up</h1><br />
            <label>Name:</label><br />
            <input type="text" placeholder="Name" value={this.state.name} onChange={this.nameHandler} /><br /><br />
            <label>Email:</label><br />
            <input type="email" placeholder="Email" value={this.state.email} onChange={this.emailHandler} /><br /><br />
            <label>Password:</label><br />
            <input type="password" placeholder="Password" value={this.state.password} onChange={this.passwordHandler} /><br /><br />
            <label>Password again:</label><br />
            <input type="password" placeholder="Password" value={this.state.passwordAgain} onChange={this.passwordAgainHandler} /><br /><br />
            <button className="btn btn-danger margin-teeth" onClick={this.props.history.goBack}>Cancel</button>

            <button className="btn btn-success margin-teeth" onClick={this.signUpHandler}>Sign Up</button>
            {this.state.error ? <FormError /> : null}
          </center>
        }
      </div>
    )
  }
}

export default SignUp