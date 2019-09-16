import React, { Component } from 'react';
import axios from 'axios';

class NewTask extends Component {
  state = {
    name: '',
    due: ''
  }

  dataHandler = () => {
    const data = {
      name: this.state.name,
      due: this.state.due
    };
    axios.post(`https://trellacens.herokuapp.com/lists/${this.props.match.params.listId}/tasks`, data)
      .then(() => {
        this.props.history.goBack()
      })
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
          <label>Due:</label><br />
          <input type="text" placeholder="When?" value={this.state.due} onChange={(event) => this.setState({ due: event.target.value })} /><br /><br />
        </center>
        <center><button className="btn btn-success" onClick={this.dataHandler}>Add Task</button></center>
      </div>
    )
  }
}

export default NewTask