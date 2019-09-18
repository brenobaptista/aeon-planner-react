import React, { Component } from 'react';
import axios from 'axios';

class EditTask extends Component {
    state = {
        name: '',
        description: ''
    }

    componentDidMount() {
        this.setState({ 
          name: this.props.match.params.taskName,
          description: this.props.match.params.taskDescription
        })
    }

    dataHandler = () => {
        const data = {
            name: this.state.name,
            description: this.state.description
        };
        axios.put(`https://trello-api-second.herokuapp.com/tasks/${this.props.match.params.taskId}`, data)
            .then(() => {
                this.props.history.goBack();
            })
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
                <center><button className="btn btn-success" onClick={this.dataHandler}>Finish editing</button></center>
            </div>
        )
    }
}

export default EditTask;