import React, { Component } from 'react'
import Boards from './components/Boards/Boards';
import axios from 'axios';

import './components/Boards/Boards.css'

class Home extends Component {
  state = {
    boards: []
  }

  componentDidMount () {
    axios.get('https://trellacens.herokuapp.com/boards')
      .then(response => {
        console.log(response.data)
        this.setState({ boards: response.data })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render () {
    return (
      <>
        <center className="margin-t-b"><h1>Board List</h1></center>
        <Boards boards={this.state.boards} />
      </>
    )
  }
}
  
export default Home