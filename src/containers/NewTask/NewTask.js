/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import axios from 'axios';

import FormError from '../../components/FormError/FormError';

class NewTask extends Component {
  state = {
    name: '',
    description: '',
    error: false
  }

  dataHandler = async () => {
    const data = {
      name: this.state.name,
      description: this.state.description,
      listId: this.props.match.params.listId
    };
    try {
      const newItem = await axios.post(`https://trello-api-nodejs.herokuapp.com/tasks/`, data);
      this.props.history.goBack();
    }
    catch {
      this.setState({ error: true })
    }
  }

  render() {
    return (
      <div>
        <center><h1 className="margin-t-b">Add a new task</h1></center>
        <center>
          <label>Name:</label><br />
          <input type="text" placeholder="Task Name" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} /><br /><br />
        </center>
        <center>
          <label>Description:</label><br />
          <textarea type="text" placeholder="Task Description?" value={this.state.description} onChange={(event) => this.setState({ description: event.target.value })} /><br /><br />
        </center>
        <center>
          <button className="btn btn-danger margin-teeth" onClick={this.props.history.goBack}>Cancel</button>
          <button className="btn btn-success margin-teeth" onClick={this.dataHandler}>Add Task</button>
        </center>
        {this.state.error ? <FormError /> : null}
      </div>
    )
  }
}

export default NewTask