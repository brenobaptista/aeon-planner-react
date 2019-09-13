import React, { Component } from 'react'
import Boards from './components/Boards/Boards';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './App.css'

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
        <Link to="/new-board"><center><button className="btn btn-success button-margin">+ New Board</button></center></Link>
      </>
    )
  }
}
  
export default Home