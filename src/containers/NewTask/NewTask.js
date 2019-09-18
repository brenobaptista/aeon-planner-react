import React, { Component } from 'react';
import axios from 'axios';

class NewTask extends Component {
  state = {
    name: '',
    description: ''
  }

  dataHandler = () => {
    const data = {
      name: this.state.name,
      description: this.state.description,
      list_id: this.props.match.params.listId
    };
    axios.post(`https://trello-api-second.herokuapp.com/tasks/`, data)
      .then(() => {
        this.props.history.goBack();
      })
  }

  goBack = () => {
    this.props.history.goBack();
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
          <button className="btn btn-danger mod-button" onClick={this.goBack}>Cancel</button>
          <button className="btn btn-success mod-button" onClick={this.dataHandler}>Add Task</button>
        </center>
      </div>
    )
  }
}

export default NewTask