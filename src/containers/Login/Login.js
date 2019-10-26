import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Card, CardText, CardBody, CardTitle } from 'reactstrap';

import classes from './Login.module.css';
import FormError from '../../components/FormError/FormError';
import Spinner from '../../components/Spinner/Spinner';

class Login extends Component {
  state = {
    email: '',
    password: '',
    error: false,
    authLoading: false,
    errorMessage: '',
    emailInvalid: false,
    emailValid: false,
    passwordInvalid: false,
  }

  loginHandler = async (event) => {
    event.preventDefault()
    this.setState({
      authLoading: true,
      emailInvalid: false,
      emailValid: false,
      passwordInvalid: false,
      errorMessage: '',
    })
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    try {
      const res = await axios.post('https://trello-api-nodejs.herokuapp.com/login', data)
      this.setState({
        authLoading: false,
        error: false,
      })
      console.log(res.data.token)
      console.log(res.data.userId)
    } catch (error) {
      switch (error.response.data.message) {
        case 'A user with this email could not be found.':
          this.setState({
            errorMessage: 'A user with this email could not be found.',
            emailInvalid: true,
          })
          break;
        case 'Wrong password!':
          this.setState({
            errorMessage: 'Wrong password!',
            passwordInvalid: true,
            emailValid: true,
          })
          break;
        default:
          this.setState({ errorMessage: 'Some error occurred while authenticating the user.' })
      }
      this.setState({
        error: true,
        authLoading: false,
      })
    }
  }

  emailHandler = (event) => this.setState({ email: event.target.value });
  passwordHandler = (event) => this.setState({ password: event.target.value });

  render() {
    return (
      <div className="centerText">
        <Card className={`shadow ${classes.card80} bg-light`}>
          <CardBody>
            <CardTitle tag="h1">Login</CardTitle>
            <CardText>
              <Form onSubmit={this.loginHandler}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input valid={this.state.emailValid} invalid={this.state.emailInvalid} type="email" name="email" id="email" placeholder="Your email, please" value={this.state.email} onChange={this.emailHandler} />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input invalid={this.state.passwordInvalid} type="password" name="password" id="password" placeholder="Your password, please" value={this.state.password} onChange={this.passwordHandler} />
                </FormGroup>
                <Button color="danger" className="margin-teeth" onClick={this.props.history.goBack}>Cancel</Button>
                <Button type="submit" color="success" className="margin-teeth">Login</Button><br /><br />
                <Link to="/signup"><b className={classes.greenLink}>I don't have an account yet</b></Link>
                {this.state.authLoading ? <Spinner /> : null}
                {this.state.error ? <FormError errorMessage={this.state.errorMessage} /> : null}
              </Form>
            </CardText>
          </CardBody>
        </Card>

      </div>
    )
  }
}

export default Login;