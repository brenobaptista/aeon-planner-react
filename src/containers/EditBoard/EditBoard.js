import React, { Component } from 'react';
import axios from 'axios';

class EditBoard extends Component {
    state = {
        name: ''
    }

    componentDidMount() {
        this.setState({ name: this.props.match.params.boardName })
    }

    dataHandler = () => {
        const data = {
            name: this.state.name
        };
        axios.patch(`https://trellacens.herokuapp.com/boards/${this.props.match.params.boardId}`, data)
            .then(() => {
                this.props.history.replace('/');
            })
    }

    render() {
        return(
            <div>
                <center><h1 className="margin-t-b">Edit board</h1></center>
                    <center>
                        <label>Name:</label><br />
                        <input type="text" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} /><br /><br />
                    </center>
                <center><button className="btn btn-success" onClick={this.dataHandler}>Finish editing</button></center>
            </div>
        )
    }
}

export default EditBoard;