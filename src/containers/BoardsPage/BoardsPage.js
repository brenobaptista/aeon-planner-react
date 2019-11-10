import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Boards from '../../components/Boards/Boards';
import axios from 'axios';
import classes from './BoardsPage.module.css';
import Spinner from '../../components/Spinner/Spinner';
import * as actionTypes from '../../store/actions/actionTypes';

import '../../App.css'

class Home extends Component {
  state = {
    boards: [],
    isLoaded: false,
  }

  componentDidMount() {
    this.boardHandler()
  }
  
  boardHandler = async () => {
    const response = await axios.get('https://trello-api-nodejs.herokuapp.com/boards/', {
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        userId: this.props.userId,
      }
    });
    this.setState({
      boards: response.data,
      isLoaded: true,
    })
    this.props.editBoardCompleted();
    this.props.createBoardCompleted();
  }

  deleteHandler = async (boardId) => {
    await axios.delete(`https://trello-api-nodejs.herokuapp.com/boards/${boardId}`, {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    });
    this.setState(prevState => {
      const updatedBoards = prevState.boards.filter(board => board._id !== boardId);
      return {
        boards: updatedBoards,
      }
    })
    this.props.deleteBoardCompleted();
  }

  render() {
    let authRedirect = null;

    if (!this.props.token) {
      authRedirect = <Redirect to='/login' />
    }

    return (
      <>
        <center className="margin-t-b">
          {authRedirect}
          <h1 className={classes.marginBottom}>All Boards</h1>
          {this.state.isLoaded ?
            <div>
              <Boards
                boards={this.state.boards}
                finish={this.boardHandler}
                deleted={this.deleteHandler}
              />
            </div>
            : <Spinner />
          }
        </center>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    deleteBoardCompleted: () => dispatch({ type: actionTypes.CANCEL_DELETE_BOARD }),
    editBoardCompleted: () => dispatch({ type: actionTypes.CANCEL_EDIT_BOARD }),
    createBoardCompleted: () => dispatch({ type: actionTypes.CANCEL_CREATE_BOARD }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);