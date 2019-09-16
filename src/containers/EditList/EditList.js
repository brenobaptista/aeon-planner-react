import React, { Component } from 'react';
import axios from 'axios';

class EditList extends Component {
    state = {
        name: '',
        error: false
    }

    componentDidMount() {
        this.setState({ name: this.props.match.params.listName })
    }

    dataHandler = () => {
        const data = {
            name: this.state.name
        };
        axios.patch(`https://trellacens.herokuapp.com/lists/${this.props.match.params.listId}`, data)
            .then(() => {
                this.props.history.goBack();
            })
            .catch(() => this.setState({ error: true }))
    }

    goBackList = () => {
        this.props.history.goBack();
    }

    render() {
        return(
            <div>
                <center><h1 className="margin-t-b">Edit list</h1></center>
                    <center>
                        <label>Name:</label><br />
                        <input type="text" value={this.state.name} onChange={(event) => this.setState({ name: event.target.value })} /><br /><br />
                    {this.state.error ? 
                    <div>
                        <h1>*** API PROBLEM ***</h1>
                        <h2>Error in patch list endpoint</h2>
                        <button className="btn btn-warning" onClick={this.goBackList}>Click here go to back (sorry!)</button>
                        <br /><br />
                    </div> 
                    : null}
                    </center>
                <center><button className="btn btn-success" onClick={this.dataHandler}>Finish editing</button></center>
            </div>
        )
    }
}

export default EditList;