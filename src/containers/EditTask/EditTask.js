/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import axios from 'axios';

import FormError from '../../components/FormError/FormError';

class EditTask extends Component {
  state = {
    name: '',
    description: '',
    listId: '',
    error: false
  }

  componentDidMount() {
    this.setState({
      name: this.props.match.params.taskName,
      listId: this.props.match.params.listId
    })
    if (this.props.match.params.taskDescription !== "australopithecus") {
      this.setState({
        description: this.props.match.params.taskDescription,
      })
    }
  }

  dataHandler = async () => {
    const data = {
      name: this.state.name,
      description: this.state.description,
      listId: this.state.listId
    };
    try {
      const itemUpdated = await axios.put(`https://trello-api-nodejs.herokuapp.com/tasks/${this.props.match.params.taskId}`, data);
      this.props.history.goBack();
    }
    catch {
      this.setState({ error: true })
    }
  }

  render() {
    return (
      <div>
        <center><h1 className="margin-t-b">Edit task</h1></center>
        <center>
          <label>Name:</label><br />
          <input type="text" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} /><br /><br />
        </center>
        <center>
          <label>Description:</label><br />
          <textarea type="text" value={this.state.description} onChange={(event) => this.setState({ description: event.target.value })} /><br /><br />
        </center>
        <center>
          <button className="btn btn-danger margin-teeth" onClick={this.props.history.goBack}>Cancel</button>
          <button className="btn btn-success margin-teeth" onClick={this.dataHandler}>Finish editing</button>
        </center>
        {this.state.error ? <FormError /> : null}
      </div>
    )
  }
}

export default EditTask;