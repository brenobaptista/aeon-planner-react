import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import classes from './SignIn.module.css'

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }

  emailHandler = (event) => this.setState({ email: event.target.value });
  passwordHandler = (event) => this.setState({ password: event.target.value });

  render() {
    return (
      <>
        <center>
          <h1 className="margin-t-b">Sign In</h1><br />
          <label>Email:</label><br />
          <input type="email" placeholder="Email" value={this.state.email} onChange={this.emailHandler} /><br /><br />
          <label>Password:</label><br />
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.passwordHandler} /><br /><br />
          <button className="btn btn-danger margin-teeth" onClick={this.props.history.goBack}>Cancel</button>

          {/* Adicionar a função da autenticação e componentes validação */}
          <button className="btn btn-success margin-teeth">Sign In</button><br /><br />

          <Link to="/signup"><b className={classes.greenLink}>I don't have an account yet</b></Link>
        </center>
      </>
    )
  }
}

export default SignIn;