import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  Button, Form, FormGroup, Label, Input,
} from 'reactstrap';

import FormError from '../../components/FormError/FormError';

class EditList extends Component {
  state = {
    listId: '',
    listName: '',
    boardId: '',
    error: false,
    errorMessage: '',
  }

  componentDidMount() {
    const { id, name, boardId } = this.props;

    this.setState({
      listId: id,
      listName: name,
      boardId,
    });
  }

  dataHandler = async (event) => {
    const { token, finish } = this.props;
    const { listId, listName, boardId } = this.state;

    event.preventDefault();
    const data = {
      name: listName,
      boardId,
    };
    try {
      await axios.put(`https://kanban-api-nodejs.herokuapp.com/lists/${listId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      finish();
    } catch (err) {
      this.setState({
        errorMessage: err.response.data.message,
        error: true,
      });
    }
  }

  nameHandler = (event) => this.setState({
    listName: event.target.value,
  });

  render() {
    const { cancel } = this.props;
    const { listName, error, errorMessage } = this.state;

    return (
      <>
        <Form onSubmit={this.dataHandler}>
          <Label tag="h1">
            Edit list
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
              value={listName}
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
            Finish editing
          </Button>
        </Form>

        {error ? (
          <FormError errorMessage={errorMessage} />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps)(EditList);
