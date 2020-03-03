import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';

import FormError from '../../components/FormError/FormError';

const NewBoard = (props) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { token, cancel } = props;

  const dataHandler = async (event) => {
    event.preventDefault();
    const data = {
      name,
    };
    try {
      await axios.post('https://kanban-api-nodejs.herokuapp.com/boards/', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      props.finish();
      setName('');
    } catch (err) {
      setErrorMessage(err.response.data.message);
      setError(true);
    }
  };

  const nameHandler = (event) => setName(event.target.value);

  return (
    <>
      <Form onSubmit={dataHandler}>
        <Label tag="h1">
          Add a new board
        </Label>
        <FormGroup>
          <Label for="name">
            Name
          </Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={name}
            onChange={nameHandler}
          />
        </FormGroup>
        <Button
          color="danger"
          className="margin-teeth"
          onClick={cancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          color="success"
          className="margin-teeth"
        >
          Add Board
        </Button>
      </Form>

      {error ? <FormError errorMessage={errorMessage} /> : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(NewBoard);
