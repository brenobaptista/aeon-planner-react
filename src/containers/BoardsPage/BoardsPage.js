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

  async componentDidMount() {
    const response = await axios.get('https://trello-api-nodejs.herokuapp.com/boards/');
    this.setState({
      boards: response.data,
      isLoaded: true,
    })
  }

  deleteHandler = async (boardId) => {
    await axios.delete(`https://trello-api-nodejs.herokuapp.com/boards/${boardId}`);
    this.setState(prevState => {
      const updatedBoards = prevState.boards.filter(board => board._id !== boardId);
      return { boards: updatedBoards }
    })
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