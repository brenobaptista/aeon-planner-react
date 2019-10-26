import React, { useState, useEffect } from 'react';
import axios from 'axios';

import FormError from '../../components/FormError/FormError';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const EditBoard = (props) => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setId(props.id);
    setName(props.name);
  }, [props.id, props.name])

  const dataHandler = async (event) => {
    event.preventDefault();
    const data = { name };
    try {
      await axios.put(`https://trello-api-nodejs.herokuapp.com/boards/${id}`, data);
      props.finish();
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setError(true);
    }
  }

  const nameHandler = (event) => setName(event.target.value);

  return (
    <>
      <Form onSubmit={dataHandler}>
        <Label tag="h1">Edit board</Label>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" placeholder="Name" value={name} onChange={nameHandler} />
        </FormGroup>
        <Button color="danger" className="margin-teeth" onClick={props.cancel}>Cancel</Button>
        <Button type="submit" color="success" className="margin-teeth">Finish editing</Button>
      </Form>

      {error ? <FormError errorMessage={errorMessage} /> : null}
    </>
  );
};

export default EditBoard;