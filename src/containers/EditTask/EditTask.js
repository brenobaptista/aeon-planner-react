import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';

import FormError from '../../components/FormError/FormError';

class EditTask extends Component {
  state = {
    taskId: '',
    taskName: '',
    taskDescription: '',
    listId: '',
    error: false,
    errorMessage: '',
  }

  componentDidMount() {
    const {
      id, name, description, listId,
    } = this.props;

    this.setState({
      taskId: id,
      taskName: name,
      taskDescription: description,
      listId,
    });
  }

  dataHandler = async (event) => {
    const {
      taskId, taskName, taskDescription, listId,
    } = this.state;

    const { token, finish } = this.props;

    event.preventDefault();
    const data = {
      name: taskName,
      description: taskDescription,
      listId,
    };
    try {
      await axios.put(`https://kanban-api-nodejs.herokuapp.com/tasks/${taskId}`, data, {
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
    taskName: event.target.value,
  });

  descriptionHandler = (event) => this.setState({
    taskDescription: event.target.value,
  });

  render() {
    const {
      taskName, taskDescription, error, errorMessage,
    } = this.state;
    const { cancel } = this.props;

    return (
      <>
        <Form onSubmit={this.dataHandler}>
          <Label tag="h1">
            Edit task
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
              value={taskName}
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
              value={taskDescription}
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
            Finish editing
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

export default connect(mapStateToProps)(EditTask);
