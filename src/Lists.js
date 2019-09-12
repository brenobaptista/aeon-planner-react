import React, { Component } from 'react'
import Lists from './components/Lists/Lists';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Lists2 extends Component {
  state = {
    lists: {},
    listsLists: [],
  }

  componentDidMount () {
    axios.get(`https://trellacens.herokuapp.com/boards/${this.props.match.params.listId}`)
      .then(response => {
        this.setState({ lists: response.data,
                        listsLists: response.data.lists })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    const myId = this.props.match.params.listId;

    return (
      <>
        <Lists lists={this.state.lists} listsLists={this.state.listsLists} myId={myId} />
        <Link to={`new-list/${this.props.match.params.listId}`}><center><button className="btn btn-success button-margin">+ New List</button></center></Link>
      </>
    )
  }
}
  
export default Lists2