import React, { useState } from 'react';
import axios from 'axios';
import {
  Button, Form, FormGroup, Label, Input, Card, CardText, CardBody, CardTitle,
} from 'reactstrap';

import classes from './SignUp.module.css';
import FormError from '../../components/FormError/FormError';
import Spinner from '../../components/Spinner/Spinner';

const SignUp = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  const { history } = props;

  const signUpHandler = async (event) => {
    event.preventDefault();
    try {
      if (password === passwordConfirm) {
        setEmailInvalid(false);
        setPasswordInvalid(false);
        setAuthLoading(true);
        const data = {
          email, password,
        };
        await axios.put('https://kanban-api-nodejs.herokuapp.com/signup', data);
        setError(false);
        setAuthLoading(false);
        props.history.push('/login');
      } else {
        setErrorMessage('Passwords don\'t match!');
        setError(true);
        setPasswordInvalid(true);
      }
    } catch (erro) {
      erro.response.data.errors.map((err) => {
        switch (err.msg) {
          case 'Password must be at least 5 chars long.':
            setPasswordInvalid(true);
            setErrorMessage('Password must be at least 5 chars long.');
            break;
          case 'Email address already exists.':
            setErrorMessage('Email address already exists.');
            setEmailInvalid(true);
            break;
          case 'Please enter a valid email.':
            setErrorMessage('Please enter a valid email.');
            setEmailInvalid(true);
            break;
          default:
            return null;
        }
        return null;
      });
      setAuthLoading(false);
      setError(true);
    }
  };

  const emailHandler = (event) => setEmail(event.target.value);
  const passwordHandler = (event) => setPassword(event.target.value);
  const passwordConfirmHandler = (event) => setPasswordConfirm(event.target.value);

  return (
    <div className="centerText">
      <Card className={`shadow ${classes.card80} bg-light`}>
        <CardBody>
          <CardTitle tag="h1">
            Sign Up
          </CardTitle>
          <CardText>
            <Form onSubmit={signUpHandler}>
              <FormGroup>
                <Label for="email">
                  Email
                </Label>
                <Input
                  invalid={emailInvalid}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Type your email"
                  value={email}
                  onChange={emailHandler}
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
                  placeholder="Choose your password"
                  value={password}
                  onChange={passwordHandler}
                />
              </FormGroup>
              <FormGroup>
                <Label for="passwordConfirm">
                  Confirm Password
                </Label>
                <Input
                  invalid={passwordInvalid}
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  placeholder="Confirm your password"
                  value={passwordConfirm}
                  onChange={passwordConfirmHandler}
                />
              </FormGroup>
              <Button
                color="danger"
                className="margin-teeth"
                onClick={history.goBack}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                color="success"
                className="margin-teeth"
              >
                Sign Up
              </Button>

              {authLoading ? <Spinner /> : null}
              {error ? <FormError errorMessage={errorMessage} /> : null}
            </Form>
          </CardText>
        </CardBody>
      </Card>

    </div>
  );
};

export default SignUp;
