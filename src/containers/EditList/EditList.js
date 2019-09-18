import React, { Component } from 'react';
import axios from 'axios';

class EditList extends Component {
    state = {
        name: '',
    }

    componentDidMount() {
        this.setState({ name: this.props.match.params.listName })
    }

    dataHandler = () => {
        const data = {
            name: this.state.name
        };
        axios.put(`https://trello-api-second.herokuapp.com/lists/${this.props.match.params.listId}`, data)
            .then(() => {
                this.props.history.goBack();
            })
            .catch((error) => console.log(error))
    }

    render() {
        return(
            <div>
                <center><h1 className="margin-t-b">Edit list</h1></center>
                    <center>
                        <label>Name:</label><br />
                        <input type="text" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} /><br /><br />
                    </center>
                <center><button className="btn btn-success" onClick={this.dataHandler}>Finish editing</button></center>
            </div>
        )
    }
}

export default EditList;