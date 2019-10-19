import React, { Component } from 'react';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    passwordAgain: ''
  }

  emailHandler = (event) => this.setState({ email: event.target.value });
  passwordHandler = (event) => this.setState({ password: event.target.value });
  passwordAgainHandler = (event) => this.setState({ passwordAgain: event.target.value });

  render() {
    return (
      <div>
        <center>
          <h1 className="margin-t-b">Sign Up</h1><br />
          <label>Email:</label><br />
          <input type="email" placeholder="Email" value={this.state.email} onChange={this.emailHandler} /><br /><br />
          <label>Password:</label><br />
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.passwordHandler} /><br /><br />
          <label>Password again:</label><br />
          <input type="password" placeholder="Password" value={this.state.passwordAgain} onChange={this.passwordAgainHandler} /><br /><br />
          <button className="btn btn-danger margin-teeth" onClick={this.props.history.goBack}>Cancel</button>

          {/* Adicionar a função da autenticação e componentes validação */}
          <button className="btn btn-success margin-teeth">Sign Up</button>
        </center>
      </div>
    )
  }
}

export default SignUp