import React, { Component } from 'react';
import axios from 'axios';

class EditTask extends Component {
    state = {
        name: '',
        description: '',
        listId: ''
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

    dataHandler = () => {
        const data = {
            name: this.state.name,
            description: this.state.description,
            listId: this.state.listId
        };
        axios.put(`https://trello-api-nodejs.herokuapp.com/tasks/${this.props.match.params.taskId}`, data)
            .then(() => {
                this.props.history.goBack();
            })
    }

    goBack = () => {
      this.props.history.goBack();
    }

    render() {
        return(
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
                  <button className="btn btn-danger margin-teeth" onClick={this.goBack}>Cancel</button>
                  <button className="btn btn-success margin-teeth" onClick={this.dataHandler}>Finish editing</button>
                </center>
            </div>
        )
    }
}

export default EditTask;