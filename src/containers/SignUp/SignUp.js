import React, { Component } from 'react';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    passwordAgain: ''
  }

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    return (
      <>
        <center>
          <h1 className="margin-t-b">Sign Up</h1><br />
          <label>Email:</label><br />
          <input type="email" placeholder="Email" value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} /><br /><br />
          <label>Password:</label><br />
          <input type="password" placeholder="Password" value={this.state.password} onChange={(event) => this.setState({ password: event.target.value })} /><br /><br />
          <label>Password again:</label><br />
          <input type="password" placeholder="Password" value={this.state.passwordAgain} onChange={(event) => this.setState({ passwordAgain: event.target.value })} /><br /><br />
          <button className="btn btn-danger margin-teeth" onClick={this.goBack}>Cancel</button>

          {/* Adicionar a função da autenticação e componentes validação */}
          <button className="btn btn-success margin-teeth">Sign Up</button>

        </center>
      </>
    )
  }
}

export default SignUp