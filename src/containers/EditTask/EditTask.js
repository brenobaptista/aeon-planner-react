import React, { Component } from 'react';
import axios from 'axios';

import FormError from '../../components/FormError/FormError';

class EditTask extends Component {
  state = {
    id: '',
    name: '',
    description: '',
    listId: '',
    error: false
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      name: this.props.name,
      listId: this.props.listId,
      description: this.props.description
    })
  }

  dataHandler = async () => {
    const data = {
      name: this.state.name,
      description: this.state.description,
      listId: this.state.listId
    };
    try {
      await axios.put(`https://trello-api-nodejs.herokuapp.com/tasks/${this.state.id}`, data);
      this.props.finish();
    } catch {
      this.setState({ error: true })
    }
  }

  nameHandler = (event) => this.setState({ name: event.target.value });
  descriptionHandler = (event) => this.setState({ description: event.target.value });

  render() {
    return (
      <div>
        <center>
          <h1>Edit task</h1>
          <label>Name:</label><br />
          <input type="text" value={this.state.name} onChange={this.nameHandler} /><br /><br />
          <label>Description:</label><br />
          <textarea type="text" value={this.state.description} onChange={this.descriptionHandler} /><br /><br />
          <button className="btn btn-danger margin-teeth" onClick={this.props.cancel}>Cancel</button>
          <button className="btn btn-success margin-teeth" onClick={this.dataHandler}>Finish editing</button>
          {this.state.error ? <FormError /> : null}
        </center>
      </div>
    )
  }
}

export default EditTask;