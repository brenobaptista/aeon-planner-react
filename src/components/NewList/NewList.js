import React, { Component } from 'react';
import axios from 'axios';

class NewList extends Component {
    state = {
        id: '',
        name: ''
    }

    dataHandler = () => {
        const data = {
            id: this.state.id,
            name: this.state.name
        };
        axios.post(`https://trellacens.herokuapp.com/boards/${this.props.match.params.listId}/lists`, data)
            .then(() => {
                this.props.history.goBack()
            })
    }

    render() {
        return (
            <div>
                <center><h1 className="margin-t-b">Add a new list</h1></center>
                <center>
                    <label>Id:</label><br />
                    <input type="number" placeholder="List Id" value={this.state.id} onChange={(event) => this.setState({ id: event.target.value })} /><br /><br />
                </center>
                <center>
                    <label>Name:</label><br />
                    <input type="text" placeholder="List Name" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} /><br /><br />
                </center>
                <center><button className="btn btn-success" onClick={this.dataHandler}>Add List</button></center>
            </div>
        )
    }
}

export default NewList;