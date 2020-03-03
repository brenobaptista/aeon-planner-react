import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';

import FormError from '../../components/FormError/FormError';

class NewTask extends Component {
  state = {
    name: '',
    description: '',
    error: false,
    errorMessage: '',
  }

  dataHandler = async (event) => {
    const { name, description } = this.state;
    const { token, finish, listId } = this.props;

    event.preventDefault();
    const data = {
      name,
      description,
      listId,
    };
    try {
      await axios.post('https://kanban-api-nodejs.herokuapp.com/tasks/', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      finish();
    } catch (err) {
      this.setState({
        error: true,
        errorMessage: err.response.data.message,
      });
    }
  }

  nameHandler = (event) => this.setState({
    name: event.target.value,
  });

  descriptionHandler = (event) => this.setState({
    description: event.target.value,
  });

  render() {
    const {
      name, description, errorMessage, error,
    } = this.state;
    const { cancel } = this.props;

    return (
      <>
        <Form onSubmit={this.dataHandler}>
          <Label tag="h1">
            Add a new task
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
              onChange={this.nameHandler}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">
              Description
            </Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              placeholder="Description"
              value={description}
              onChange={this.descriptionHandler}
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
            Add Task
          </Button>
        </Form>

        {error ? <FormError errorMessage={errorMessage} /> : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(NewTask);
