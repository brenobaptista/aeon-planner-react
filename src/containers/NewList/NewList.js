import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';

import FormError from '../../components/FormError/FormError';

class NewList extends Component {
  state = {
    name: '',
    error: false,
    errorMessage: '',
  }

  dataHandler = async (event) => {
    const { token, finish, boardId } = this.props;
    const { name } = this.state;

    event.preventDefault();
    const data = {
      name,
      boardId,
    };
    try {
      await axios.post('https://kanban-api-nodejs.herokuapp.com/lists/', data, {
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

  render() {
    const { name, errorMessage, error } = this.state;
    const { cancel } = this.props;

    return (
      <>
        <Form onSubmit={this.dataHandler}>
          <Label tag="h1">
            Add a new list
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
            Add List
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

export default connect(mapStateToProps)(NewList);
