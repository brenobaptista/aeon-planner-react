/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import Boards from '../../components/Boards/Boards';
import axios from 'axios';
import { Link } from 'react-router-dom';
import classes from './BoardsPage.module.css';
import Spinner from '../../components/Spinner/Spinner'

import '../../App.css'

class Home extends Component {
  state = {
    boards: [],
    isLoaded: false
  }

  componentDidMount() {
    this.getHandler();
  }

  getHandler = async () => {
    const response = await axios.get('https://trello-api-nodejs.herokuapp.com/boards/');
    this.setState({
      boards: response.data,
      isLoaded: true,
    })
  }

  deleteHandler = async (boardId) => {
    const itemDeleted = await axios.delete(`https://trello-api-nodejs.herokuapp.com/boards/${boardId}`);
    this.getHandler();
  }

  render() {
    return (
      <>
        <center className="margin-t-b">
          <h1 className={classes.marginBottom}>All Boards</h1>
          {this.state.isLoaded ? 
            <div>
              <Link to="/new-board"><button className={`btn btn-success ${classes.marginBottom}`}>+ New Board</button></Link>
              <Boards boards={this.state.boards} deleted={this.deleteHandler} />
            </div>
            : <Spinner />
          }
        </center>
      </>
    )
  }
}

export default Home