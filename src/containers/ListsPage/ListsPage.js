import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import Lists from '../../components/Lists/Lists';
import Spinner from '../../components/Spinner/Spinner';
import * as actionTypes from '../../store/actions/actionTypes';

class ListsPage extends Component {
  state = {
    lists: [],
    tasks: [],
    isLoaded: false,
  }

  componentDidMount() {
    this.listHandler();
  }

  listHandler = async () => {
    const {
      token, userId, editTaskCompleted, editListCompleted, createTaskCompleted, createListCompleted,
    } = this.props;

    const responseLists = await axios.get('https://kanban-api-nodejs.herokuapp.com/lists/', {
      headers: {
        Authorization: `Bearer ${token}`,
        userId,
      },
    });
    this.setState({
      lists: responseLists.data,
    });

    const responseTasks = await axios.get('https://kanban-api-nodejs.herokuapp.com/tasks/', {
      headers: {
        Authorization: `Bearer ${token}`,
        userId,
      },
    });
    this.setState({
      tasks: responseTasks.data,
      isLoaded: true,
    });

    editListCompleted();
    editTaskCompleted();
    createTaskCompleted();
    createListCompleted();
  }

  deleteListHandler = async (listId) => {
    const { token, deleteListCompleted } = this.props;

    await axios.delete(`https://kanban-api-nodejs.herokuapp.com/lists/${listId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    this.setState((prevState) => {
      const updatedLists = prevState.lists.filter((list) => list._id !== listId);
      return {
        lists: updatedLists,
      };
    });
    deleteListCompleted();
  }

  deleteTaskHandler = async (taskId) => {
    const { token, deleteTaskCompleted } = this.props;

    await axios.delete(`https://kanban-api-nodejs.herokuapp.com/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    this.setState((prevState) => {
      const updatedTasks = prevState.tasks.filter((task) => task._id !== taskId);
      return {
        tasks: updatedTasks,
      };
    });
    deleteTaskCompleted();
  }

  render() {
    const { token, match } = this.props;
    const { isLoaded, lists, tasks } = this.state;

    let authRedirect = null;

    if (!token) {
      authRedirect = <Redirect to="/login" />;
    }

    return (
      <>
        <center>
          {authRedirect}
          {isLoaded ? (
            <div>
              <Lists
                lists={lists}
                tasks={tasks}
                boardId={match.params.boardId}
                boardName={match.params.boardName}
                deleteTask={this.deleteTaskHandler}
                deleteList={this.deleteListHandler}
                finish={this.listHandler}
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
  deleteTaskCompleted: () => dispatch({
    type: actionTypes.CANCEL_DELETE_TASK,
  }),
  editTaskCompleted: () => dispatch({
    type: actionTypes.CANCEL_EDIT_TASK,
  }),
  createTaskCompleted: () => dispatch({
    type: actionTypes.CANCEL_CREATE_TASK,
  }),
  deleteListCompleted: () => dispatch({
    type: actionTypes.CANCEL_DELETE_LIST,
  }),
  editListCompleted: () => dispatch({
    type: actionTypes.CANCEL_EDIT_LIST,
  }),
  createListCompleted: () => dispatch({
    type: actionTypes.CANCEL_CREATE_LIST,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListsPage);
