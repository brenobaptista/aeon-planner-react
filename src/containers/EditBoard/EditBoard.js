import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';

import FormError from '../../components/FormError/FormError';

const EditBoard = (props) => {
  const [boardId, setBoardId] = useState('');
  const [boardName, setBoardName] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    id, name, token, cancel,
  } = props;

  useEffect(() => {
    setBoardId(id);
    setBoardName(name);
  }, [id, name]);

  const dataHandler = async (event) => {
    event.preventDefault();
    const data = {
      name: boardName,
    };
    try {
      await axios.put(`https://kanban-api-nodejs.herokuapp.com/boards/${boardId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      props.finish();
    } catch (err) {
      setErrorMessage(err.response.data.message);
      setError(true);
    }
  };

  const nameHandler = (event) => setBoardName(event.target.value);

  return (
    <>
      <Form onSubmit={dataHandler}>
        <Label tag="h1">
          Edit board
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
            value={boardName}
            onChange={nameHandler}
          />
        </FormGroup>
        <Button color="danger" className="margin-teeth" onClick={cancel}>
          Cancel
        </Button>
        <Button type="submit" color="success" className="margin-teeth">
          Finish editing
        </Button>
      </Form>

      {error ? <FormError errorMessage={errorMessage} /> : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(EditBoard);
