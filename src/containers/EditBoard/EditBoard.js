import React, { Component } from 'react';
import axios from 'axios';

import FormError from '../../components/FormError/FormError';

class EditBoard extends Component {
  state = {
    id: '',
    name: '',
    error: false
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      name: this.props.name
    })
  }

  dataHandler = async () => {
    const data = { name: this.state.name };
    try {
      await axios.put(`https://trello-api-nodejs.herokuapp.com/boards/${this.state.id}`, data);
      this.props.finish();
    } catch {
      this.setState({ error: true })
    }
  }

  nameHandler = (event) => this.setState({ name: event.target.value });

  render() {
    return (
      <div>
        <center>
          <h1>Edit board</h1>
          <label>Name:</label><br />
          <input type="text" value={this.state.name} onChange={this.nameHandler} /><br /><br />
          <button className="btn btn-danger margin-teeth" onClick={this.props.cancel}>Cancel</button>
          <button className="btn btn-success margin-teeth" onClick={this.dataHandler}>Finish editing</button>
          {this.state.error ? <FormError /> : null}
        </center>
      </div>
    )
  }
}

export default EditBoard;