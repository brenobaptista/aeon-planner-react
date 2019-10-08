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
      this.props.history.goBack();
    }
    catch {
      this.setState({ error: true })
    }
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
          <button className="btn btn-danger margin-teeth" onClick={this.props.history.goBack}>Cancel</button>
          <button className="btn btn-success margin-teeth" onClick={this.dataHandler}>Add Board</button>
        </center>
        {this.state.error ? <FormError /> : null}
      </div>
    );
  }
}

export default NewBoard;