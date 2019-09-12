import React, { Component } from 'react';
import axios from 'axios';

class NewTask extends Component {
    state = {
        id: '',
        name: '',
        due: null
    }

    dataHandler = () => {
        const data = {
            id: this.state.id,
            name: this.state.name,
            due: this.state.due
        };

        /* Diferenciar id da lista do id do board -> trocar listId por boardId */

        /* end point do post: [POST] tasks#create => /lists/:list_id/tasks (Create a task) */
        /* {console.log(this.props.match.params.listId)} */

        /* axios.post(`https://trellacens.herokuapp.com/boards/${this.props.match.params.listId}/lists`, data)
        .then(() => {
            this.props.history.goBack()
        }) */

    }

    render () {
        return (
            <div>
                <center><h1 className="margin-t-b">Add a new task</h1></center>
                <center>
                    <label>Id:</label><br />
                    <input type="text" placeholder="Task Id" value={this.state.id} onChange={(event) => this.setState({ id: event.target.value })} /><br /><br />
                </center>
                <center>
                    <label>Name:</label><br />
                    <input type="text" placeholder="Task Name" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} /><br /><br />
                </center>
                <center>
                    <label>Due:</label><br />
                    <input type="text" placeholder="When?" /><br /><br />
                </center>
                <center><button className="btn btn-success" onClick={this.dataHandler}>Add Task</button></center>
            </div>
        )
    }
}

export default NewTask