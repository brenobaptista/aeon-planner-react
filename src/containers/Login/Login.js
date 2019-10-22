import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import classes from './Login.module.css';
import FormError from '../../components/FormError/FormError';
import Spinner from '../../components/Spinner/Spinner';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: false,
    authLoading: false,
  }

  loginHandler = async () => {
    this.setState({ authLoading: true })
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    try {
      const res = await axios.post('https://trello-api-nodejs.herokuapp.com/login', data)
      this.setState({ authLoading: false })
      console.log(res.data.token)
      console.log(res.data.userId)
    } catch {
      this.setState({ 
        error: true,
        authLoading: false
      })
    }
  }

  emailHandler = (event) => this.setState({ email: event.target.value });
  passwordHandler = (event) => this.setState({ password: event.target.value });

  render() {
    return (
      <div>
        {this.state.authLoading ? <Spinner /> :
          <center>
            <h1 className="margin-t-b">Login</h1><br />
            <label>Email:</label><br />
            <input type="email" placeholder="Email" value={this.state.email} onChange={this.emailHandler} /><br /><br />
            <label>Password:</label><br />
            <input type="password" placeholder="Password" value={this.state.password} onChange={this.passwordHandler} /><br /><br />
            <button className="btn btn-danger margin-teeth" onClick={this.props.history.goBack}>Cancel</button>

            <button className="btn btn-success margin-teeth" onClick={this.loginHandler}>Login</button><br /><br />
            <Link to="/signup"><b className={classes.greenLink}>I don't have an account yet</b></Link>
            {this.state.error ? <FormError /> : null}
          </center>
        }
      </div>
    )
  }
}

export default Login;