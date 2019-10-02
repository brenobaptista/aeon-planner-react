import React, { Component } from 'react';
import axios from 'axios';

class NewList extends Component {
  state = {
    name: '',
  }

  
  dataHandler = () => {
    const data = {
      name: this.state.name,
      boardId: this.props.match.params.boardId
    };
    axios.post(`https://trello-api-nodejs.herokuapp.com/lists/`, data)
    .then(() => {
      this.props.history.goBack()
      })
      .catch((error) => console.log(error))
  }

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    return (
      <div>
        <center><h1 className="margin-t-b">Add a new list</h1></center>
        <center>
          <label>Name:</label><br />
          <input type="text" placeholder="List Name" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} /><br /><br />
        </center>
        <center>
          <button className="btn btn-danger margin-teeth" onClick={this.goBack}>Cancel</button>
          <button className="btn btn-success margin-teeth" onClick={this.dataHandler}>Add List</button>
        </center>
      </div>
    )
  }
}

export default NewList;