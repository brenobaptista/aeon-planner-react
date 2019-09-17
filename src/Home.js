import React, { Component } from 'react'
import Boards from './components/Boards/Boards';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './App.css'

class Home extends Component {
  state = {
    boards: [],
    isLoaded: false
  }

  componentDidMount() {
    this.getHandler();
  }

  getHandler = () => {
    axios.get('https://trellacens.herokuapp.com/boards')
    .then(response => {
      this.setState({ 
        boards: response.data,
        isLoaded: true 
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  deleteHandler = (board_id) => {
    axios.delete(`https://trellacens.herokuapp.com/boards/${board_id}`)
      .then( () => this.getHandler() )
  }
  /* Agora falta renderizar novamente após o delete */

  render() {
    return (
      <>
        <center className="margin-t-b"><h1>Board List</h1></center>
        {this.state.isLoaded ? 
        <div>
          <Link to="/new-board"><center><button className="btn btn-success button-margin">+ New Board</button></center></Link>
          <Boards boards={this.state.boards} deleted={this.deleteHandler} />
        </div>
        : <center><h2>Loading boards...</h2></center>}
      </>
    )
  }
}

export default Home