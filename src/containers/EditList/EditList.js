import React, { Component } from 'react';
import axios from 'axios';

import FormError from '../../components/FormError/FormError';

class EditList extends Component {
  state = {
    id: '',
    name: '',
    boardId: '',
    error: false
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      name: this.props.name,
      boardId: this.props.boardId
    })
  }

  dataHandler = async () => {
    const data = {
      name: this.state.name,
      boardId: this.state.boardId
    };
    try {
      await axios.put(`https://trello-api-nodejs.herokuapp.com/lists/${this.state.id}`, data);
      this.props.finish();
    }
    catch {
      this.setState({ error: true })
    }
  }

  nameHandler = (event) => this.setState({ name: event.target.value });

  render() {
    return (
      <div>
        <center>
          <h1>Edit list</h1>
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

export default EditList;