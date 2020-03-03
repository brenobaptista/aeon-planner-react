import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Button, Form, FormGroup, Label, Input, Card, CardText, CardBody, CardTitle,
} from 'reactstrap';
import { connect } from 'react-redux';

import classes from './Login.module.css';
import FormError from '../../components/FormError/FormError';
import Spinner from '../../components/Spinner/Spinner';
import * as actionCreators from '../../store/actions/index';

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
    const { email, password } = this.state;
    const { responseHandler, history } = this.props;

    event.preventDefault();
    this.setState({
      authLoading: true,
      emailInvalid: false,
      emailValid: false,
      passwordInvalid: false,
      errorMessage: '',
    });
    const data = {
      email,
      password,
    };
    try {
      const res = await axios.post('https://kanban-api-nodejs.herokuapp.com/login', data);
      this.setState({
        authLoading: false,
        error: false,
      });
      responseHandler(res.data.token, res.data.userId, res.data.expiresIn);
      history.push('/board');
    } catch (err) {
      switch (err.response.data.message) {
        case 'A user with this email could not be found.':
          this.setState({
            errorMessage: 'A user with this email could not be found.',
            emailInvalid: true,
          });
          break;
        case 'Wrong password!':
          this.setState({
            errorMessage: 'Wrong password!',
            passwordInvalid: true,
            emailValid: true,
          });
          break;
        default:
          this.setState({
            errorMessage: 'Some error occurred while authenticating the user.',
          });
      }
      this.setState({
        error: true,
        authLoading: false,
      });
    }
  }

  emailHandler = (event) => this.setState({
    email: event.target.value,
  });

  passwordHandler = (event) => this.setState({
    password: event.target.value,
  });

  render() {
    const {
      emailValid, emailInvalid, email, passwordInvalid, password, authLoading, errorMessage, error,
    } = this.state;
    const { history } = this.props;

    return (
      <div className="centerText">
        <Card className={`shadow ${classes.card80} bg-light`}>
          <CardBody>
            <CardTitle tag="h1">
              Login
            </CardTitle>
            <CardText>
              <Form onSubmit={this.loginHandler}>
                <FormGroup>
                  <Label for="email">
                    Email
                  </Label>
                  <Input
                    valid={emailValid}
                    invalid={emailInvalid}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your email, please"
                    value={email}
                    onChange={this.emailHandler}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">
                    Password
                  </Label>
                  <Input
                    invalid={passwordInvalid}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your password, please"
                    value={password}
                    onChange={this.passwordHandler}
                  />
                </FormGroup>
                <Button color="danger" className="margin-teeth" onClick={history.goBack}>
                  Cancel
                </Button>
                <Button type="submit" color="success" className="margin-teeth">
                  Login
                </Button>
                <br />
                <br />
                <Link to="/signup">
                  <b className={classes.greenLink}>
                    I don&lsquo;t have an account yet
                  </b>
                </Link>
                <br />
                <br />
                <Link to="/reset">
                  <b className={classes.greenLink}>
                    I&lsquo;ve forgotten my password
                  </b>
                </Link>
                {authLoading ? <Spinner /> : null}
                {error ? <FormError errorMessage={errorMessage} /> : null}
              </Form>
            </CardText>
          </CardBody>
        </Card>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  responseHandler: (token, userId, expiresIn) => dispatch(actionCreators.responseHandler(token, userId, expiresIn)),
});

export default connect(null, mapDispatchToProps)(Login);
