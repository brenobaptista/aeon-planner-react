import React, { useState } from 'react';
import axios from 'axios';
import {
  Button, Form, FormGroup, Label, Input, Card, CardText, CardBody, CardTitle,
} from 'reactstrap';

import classes from './ResetPassword.module.css';
import FormError from '../../components/FormError/FormError';
import Spinner from '../../components/Spinner/Spinner';

const ResetPassword = (props) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);

  const { history } = props;

  const resetPasswordHandler = async (event) => {
    event.preventDefault();
    try {
      setError(false);
      setAuthLoading(true);
      setEmailInvalid(false);
      const data = {
        email,
      };
      await axios.post('https://kanban-api-nodejs.herokuapp.com/reset', data);
      setAuthLoading(false);
      props.history.push('/login');
    } catch (err) {
      setErrorMessage(err.response.data.message);
      setError(true);
      setAuthLoading(false);
      setEmailInvalid(true);
    }
  };

  const emailHandler = (event) => setEmail(event.target.value);

  return (
    <div className="centerText">
      <Card className={`shadow ${classes.card80} bg-light`}>
        <CardBody>
          <CardTitle tag="h1">
            Reset Password
          </CardTitle>
          <CardText>
            <Form onSubmit={resetPasswordHandler}>
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
                Reset Password
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

export default ResetPassword;
