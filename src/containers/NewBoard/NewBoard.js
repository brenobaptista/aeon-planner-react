import React, { Component } from 'react';
import axios from 'axios';

class NewBoard extends Component {
  state = {
    name: ''
  }

  dataHandler = () => {
    const data = {
      name: this.state.name
    };
    axios.post('https://trellacens.herokuapp.com/boards', data)
      .then(() => {
        this.props.history.replace('/');
      })
  }

  render() {
    return (
      <div>
        <center><h1 className="margin-t-b">Add a new board</h1></center>
        <center>
          <label>Name:</label><br />
          <input type="text" placeholder="Board Name" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} /><br /><br />
        </center>
        <center><button className="btn btn-success" onClick={this.dataHandler}>Add Board</button></center>
      </div>
    );
  }
}

export default NewBoard;