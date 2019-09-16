import React, { Component } from 'react'
import Lists from './components/Lists/Lists';
import axios from 'axios';

class ListsPage extends Component {
  state = {
    listInfo: {},
    lists: [],
  }

  componentDidMount() {
    axios.get(`https://trellacens.herokuapp.com/boards/${this.props.match.params.boardId}`)
      .then(response => {
        this.setState({
          listInfo: response.data,
          lists: response.data.lists
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    const board_id = this.props.match.params.boardId;

    return (
      <>
        <Lists listInfo={this.state.listInfo} lists={this.state.lists} board_id={board_id} />
      </>
    )
  }
}

export default ListsPage