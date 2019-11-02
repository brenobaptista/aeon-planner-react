/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, Card, CardText, CardBody, CardTitle } from 'reactstrap';

import classes from './NewPassword.module.css';
import FormError from '../../components/FormError/FormError';
import Spinner from '../../components/Spinner/Spinner';

const NewPassword = (props) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  const newPasswordHandler = async (event) => {
    event.preventDefault();
    try {
      if (password === passwordConfirm) {
        setError(false);
        setPasswordInvalid(false);
        setAuthLoading(true);
        const data = { password };
        await axios.post(`https://trello-api-nodejs.herokuapp.com/reset/${props.match.params.token}`, data);
        setAuthLoading(false);
        props.history.push('/login');
      } else {
        setErrorMessage('Passwords don\'t match!');
        setError(true);
        setPasswordInvalid(true);
        setAuthLoading(false);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setError(true);
      setAuthLoading(false);
    }
  }

  const passwordHandler = (event) => setPassword(event.target.value);
  const passwordConfirmHandler = (event) => setPasswordConfirm(event.target.value);

  return (
    <div className="centerText">
      <Card className={`shadow ${classes.card80} bg-light`}>
        <CardBody>
          <CardTitle tag="h1">Set the new password</CardTitle>
          <CardText>
            <Form onSubmit={newPasswordHandler}>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input invalid={passwordInvalid} type="password" name="password" id="password" placeholder="Choose your new password" value={password} onChange={passwordHandler} />
              </FormGroup>
              <FormGroup>
                <Label for="passwordConfirm">Confirm Password</Label>
                <Input invalid={passwordInvalid} type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirm your password" value={passwordConfirm} onChange={passwordConfirmHandler} />
              </FormGroup>
              <Button color="danger" className="margin-teeth" onClick={props.history.goBack}>Cancel</Button>
              <Button type="submit" color="success" className="margin-teeth">Set password</Button>
              {authLoading ? <Spinner /> : null}
              {error ? <FormError errorMessage={errorMessage} /> : null}
            </Form>
          </CardText>
        </CardBody>
      </Card>

    </div>
  );
};

export default NewPassword;