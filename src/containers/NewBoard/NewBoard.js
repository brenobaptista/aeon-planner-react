import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import FormError from '../../components/FormError/FormError';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const NewBoard = (props) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dataHandler = async (event) => {
    event.preventDefault();
    const data = { name };
    try {
      await axios.post('https://trello-api-nodejs.herokuapp.com/boards/', data, {
        headers: {
          Authorization: 'Bearer ' + props.token
        }
      });
      props.finish();
      setName('');
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setError(true);
    }
  }

  const nameHandler = (event) => setName(event.target.value);

  return (
    <>
      <Form onSubmit={dataHandler}>
        <Label tag="h1">Add a new board</Label>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" placeholder="Name" value={name} onChange={nameHandler} />
        </FormGroup>
        <Button color="danger" className="margin-teeth" onClick={props.cancel}>Cancel</Button>
        <Button type="submit" color="success" className="margin-teeth">Add Board</Button>
      </Form>
      
      {error ? <FormError errorMessage={errorMessage} /> : null}
    </>
  );
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  }
};

export default connect(mapStateToProps)(NewBoard);