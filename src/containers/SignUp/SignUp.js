import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Card, CardText, CardBody, CardTitle } from 'reactstrap';

import classes from './SignUp.module.css';
import FormError from '../../components/FormError/FormError';
import Spinner from '../../components/Spinner/Spinner';

const SignUp = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [error, setError] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const signUpHandler = async (event) => {
    try {
      if (password === passwordAgain) {
        event.preventDefault();
        setAuthLoading(true);
        const data = { name, email, password };
        await axios.put('https://trello-api-nodejs.herokuapp.com/signup', data);
        setAuthLoading(false);
        props.history.push('login');
      }
    } catch {
      setError(true);
      setAuthLoading(false);
    }
  }

  const nameHandler = (event) => setName(event.target.value);
  const emailHandler = (event) => setEmail(event.target.value);
  const passwordHandler = (event) => setPassword(event.target.value);
  const passwordAgainHandler = (event) => setPasswordAgain(event.target.value);

  return (
    <div className="centerText">
      <Card className={`shadow ${classes.card80} bg-light`}>
        <CardBody>
          <CardTitle tag="h1">Sign Up</CardTitle>
          <CardText>
            <Form onSubmit={signUpHandler}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" placeholder="Type your name" value={name} onChange={nameHandler} />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="Type your email" value={email} onChange={emailHandler} />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="Choose your password" value={password} onChange={passwordHandler} />
              </FormGroup>
              <FormGroup>
                <Label for="passwordAgain">Password Again</Label>
                <Input type="password" name="passwordAgain" id="passwordAgain" placeholder="Type your password again" value={passwordAgain} onChange={passwordAgainHandler} />
              </FormGroup>
              <Button color="danger" className="margin-teeth" onClick={props.history.goBack}>Cancel</Button>
              <Button type="submit" color="success" className="margin-teeth">Sign Up</Button>
            </Form>
          </CardText>
        </CardBody>
      </Card>
      
      {authLoading ? <Spinner /> : null}
      {error ? <FormError /> : null}
    </div>
  );
};

export default SignUp;