import React, { Component } from 'react';
import axios from 'axios';

import FormError from '../../components/FormError/FormError';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class EditTask extends Component {
  state = {
    id: '',
    name: '',
    description: '',
    listId: '',
    error: false
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      name: this.props.name,
      listId: this.props.listId,
      description: this.props.description
    })
  }

  dataHandler = async (event) => {
    event.preventDefault()
    const data = {
      name: this.state.name,
      description: this.state.description,
      listId: this.state.listId
    };
    try {
      await axios.put(`https://trello-api-nodejs.herokuapp.com/tasks/${this.state.id}`, data);
      this.props.finish();
    } catch {
      this.setState({ error: true })
    }
  }

  nameHandler = (event) => this.setState({ name: event.target.value });
  descriptionHandler = (event) => this.setState({ description: event.target.value });

  render() {
    return (
      <>
        <Form onSubmit={this.dataHandler}>
          <Label tag="h1">Edit task</Label>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.nameHandler} />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input type="textarea" name="description" id="description" placeholder="Description" value={this.state.description} onChange={this.descriptionHandler} />
          </FormGroup>
          <Button color="danger" className="margin-teeth" onClick={this.props.cancel}>Cancel</Button>
          <Button type="submit" color="success" className="margin-teeth">Finish editing</Button>
        </Form>
        
        {this.state.error ? <FormError /> : null}
      </>
    )
  }
}

export default EditTask;