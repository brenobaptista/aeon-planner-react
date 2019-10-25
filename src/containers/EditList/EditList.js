import React, { Component } from 'react';
import axios from 'axios';

import FormError from '../../components/FormError/FormError';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class EditList extends Component {
  state = {
    id: '',
    name: '',
    boardId: '',
    error: false
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      name: this.props.name,
      boardId: this.props.boardId
    })
  }

  dataHandler = async (event) => {
    event.preventDefault()
    const data = {
      name: this.state.name,
      boardId: this.state.boardId
    };
    try {
      await axios.put(`https://trello-api-nodejs.herokuapp.com/lists/${this.state.id}`, data);
      this.props.finish();
    }
    catch {
      this.setState({ error: true })
    }
  }

  nameHandler = (event) => this.setState({ name: event.target.value });

  render() {
    return (
      <>
        <Form onSubmit={this.dataHandler}>
          <Label tag="h1">Edit list</Label>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.nameHandler} />
          </FormGroup>
          <Button color="danger" className="margin-teeth" onClick={this.props.cancel}>Cancel</Button>
          <Button type="submit" color="success" className="margin-teeth">Finish editing</Button>
        </Form>
        
        {this.state.error ? <FormError /> : null}
      </>
    )
  }
}

export default EditList;