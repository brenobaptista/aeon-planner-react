import React, { Component } from 'react';
import axios from 'axios';

import FormError from '../../components/FormError/FormError';

class EditList extends Component {
  state = {
    name: '',
    boardId: '',
    error: false
  }

  componentDidMount() {
    this.setState({
      name: this.props.match.params.listName,
      boardId: this.props.match.params.boardId
    })
  }

  dataHandler = async () => {
    const data = {
      name: this.state.name,
      boardId: this.state.boardId
    };
    try {
      await axios.put(`https://trello-api-nodejs.herokuapp.com/lists/${this.props.match.params.listId}`, data);
      this.props.history.goBack();
    }
    catch {
      this.setState({ error: true })
    }
  }

  render() {
    return (
      <div>
        <center><h1 className="margin-t-b">Edit list</h1></center>
        <center>
          <label>Name:</label><br />
          <input type="text" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} /><br /><br />
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

export default EditList;