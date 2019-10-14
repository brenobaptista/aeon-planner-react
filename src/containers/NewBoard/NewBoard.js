import React, { Component } from 'react';
import axios from 'axios';

import FormError from '../../components/FormError/FormError';

class NewBoard extends Component {
  state = {
    name: '',
    error: false
  }

  dataHandler = async () => {
    const data = { name: this.state.name };
    try {
      await axios.post('https://trello-api-nodejs.herokuapp.com/boards/', data);
      await this.props.finish();
      this.setState({ name: '' })
    } catch {
      this.setState({ error: true })
    }
  }

  nameHandler = (event) => this.setState({ name: event.target.value });

  render() {
    return (
      <div>
        <center><h1>Add a new board</h1></center>
        <center>
          <label>Name:</label><br />
          <input type="text" placeholder="Board Name" value={this.state.name} onChange={this.nameHandler} /><br /><br />
        </center>
        <center>
          <button className="btn btn-danger margin-teeth" onClick={this.props.cancel}>Cancel</button>
          <button className="btn btn-success margin-teeth" onClick={this.dataHandler}>Add Board</button>
        </center>
        {this.state.error ? <FormError /> : null}
      </div>
    );
  }
}

export default NewBoard;