import React, { Component } from 'react'
import Lists from './components/Lists/Lists';
import axios from 'axios';

class Lists2 extends Component {
  state = {
    lists: {},
    listsLists: [],
  }

  componentDidMount () {
    axios.get(`https://trellacens.herokuapp.com/boards/${this.props.match.params.listId}`)
      .then(response => {
        console.log(response.data)
        this.setState({ lists: response.data,
                        listsLists: response.data.lists })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <Lists lists={this.state.lists} listsLists={this.state.listsLists} />
    )
  }
}
  
export default Lists2