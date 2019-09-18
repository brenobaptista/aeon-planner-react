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
    axios.post('https://trello-api-second.herokuapp.com/boards/', data)
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
        <center><h1 className="margin-t-b">Add a new board</h1></center>
        <center>
          <label>Name:</label><br />
          <input type="text" placeholder="Board Name" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} /><br /><br />
        </center>
        <center>
          <button className="btn btn-danger margin-teeth" onClick={this.goBack}>Cancel</button>
          <button className="btn btn-success margin-teeth" onClick={this.dataHandler}>Add Board</button>
        </center>
      </div>
    );
  }
}

export default NewBoard;