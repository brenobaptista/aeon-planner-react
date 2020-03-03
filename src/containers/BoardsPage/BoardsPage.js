import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Boards from '../../components/Boards/Boards';
import classes from './BoardsPage.module.css';
import Spinner from '../../components/Spinner/Spinner';
import * as actionTypes from '../../store/actions/actionTypes';

import '../../App.css';

class Home extends Component {
  state = {
    boards: [],
    isLoaded: false,
  }

  componentDidMount() {
    this.boardHandler();
  }

  boardHandler = async () => {
    const {
      token, userId, editBoardCompleted, createBoardCompleted,
    } = this.props;

    const response = await axios.get('https://kanban-api-nodejs.herokuapp.com/boards/', {
      headers: {
        Authorization: `Bearer ${token}`,
        userId,
      },
    });

    this.setState({
      boards: response.data,
      isLoaded: true,
    });

    editBoardCompleted();
    createBoardCompleted();
  }

  deleteHandler = async (boardId) => {
    const { token, deleteBoardCompleted } = this.props;

    await axios.delete(`https://kanban-api-nodejs.herokuapp.com/boards/${boardId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.setState((prevState) => {
      const updatedBoards = prevState.boards.filter((board) => board._id !== boardId);
      return {
        boards: updatedBoards,
      };
    });

    deleteBoardCompleted();
  }

  render() {
    const { token } = this.props;
    const { isLoaded, boards } = this.state;

    let authRedirect = null;

    if (!token) {
      authRedirect = <Redirect to="/login" />;
    }

    return (
      <>
        <center className="margin-t-b">
          {authRedirect}
          <h1 className={classes.marginBottom}>All Boards</h1>
          {isLoaded ? (
            <div>
              <Boards
                boards={boards}
                finish={this.boardHandler}
                deleted={this.deleteHandler}
              />
            </div>
          ) : <Spinner />}
        </center>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  deleteBoardCompleted: () => dispatch({
    type: actionTypes.CANCEL_DELETE_BOARD,
  }),
  editBoardCompleted: () => dispatch({
    type: actionTypes.CANCEL_EDIT_BOARD,
  }),
  createBoardCompleted: () => dispatch({
    type: actionTypes.CANCEL_CREATE_BOARD,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
