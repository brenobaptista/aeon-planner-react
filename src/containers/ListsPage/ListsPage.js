import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import Lists from '../../components/Lists/Lists';
import Spinner from '../../components/Spinner/Spinner'
import * as actionTypes from '../../store/actions/actionTypes';

class ListsPage extends Component {
  state = {
    lists: [],
    tasks: [],
    isLoaded: false,
    showEditListModal: false,
    editListId: '',
    editListName: '',
  }

  componentDidMount() {
    this.listHandler();
  }

  listHandler = async () => {
    const responseLists = await axios.get(`https://trello-api-nodejs.herokuapp.com/lists/`, {
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        userId: this.props.userId,
      }
    });
    this.setState({ lists: responseLists.data });
    const responseTasks = await axios.get(`https://trello-api-nodejs.herokuapp.com/tasks/`, {
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        userId: this.props.userId,
      }
    });
    this.setState({
      tasks: responseTasks.data,
      isLoaded: true,
      showEditListModal: false,
    })
    this.props.editTaskCompleted();
    this.props.createTaskCompleted();
    this.props.createListCompleted();
  }

  deleteListHandler = async (listId) => {
    await axios.delete(`https://trello-api-nodejs.herokuapp.com/lists/${listId}`, {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    });
    this.setState(prevState => {
      const updatedLists = prevState.lists.filter(list => list._id !== listId);
      return { 
        lists: updatedLists,
       }
    })
    this.props.deleteListCompleted();
  }

  deleteTaskHandler = async (taskId) => {
    await axios.delete(`https://trello-api-nodejs.herokuapp.com/tasks/${taskId}`, {
      headers: {
        Authorization: 'Bearer ' + this.props.token,
      }
    });
    this.setState(prevState => {
      const updatedTasks = prevState.tasks.filter(task => task._id !== taskId);
      return { 
        tasks: updatedTasks,
       }
    });
    this.props.deleteTaskCompleted();
  }

  render() {
    let authRedirect = null;

    if (!this.props.token) {
      authRedirect = <Redirect to='/login' />
    }

    return (
      <>
        <center>
          {authRedirect}
          {this.state.isLoaded ?
            <div>
              <Lists
                lists={this.state.lists}
                tasks={this.state.tasks}
                boardId={this.props.match.params.boardId}
                boardName={this.props.match.params.boardName}
                deleteTask={this.deleteTaskHandler}
                deleteList={this.deleteListHandler}
                finish={this.listHandler}
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
    deleteTaskCompleted: () => dispatch({ type: actionTypes.CANCEL_DELETE_TASK }),
    editTaskCompleted: () => dispatch({ type: actionTypes.CANCEL_EDIT_TASK }),
    createTaskCompleted: () => dispatch({ type: actionTypes.CANCEL_CREATE_TASK }),
    deleteListCompleted: () => dispatch({ type: actionTypes.CANCEL_DELETE_LIST }),
    createListCompleted: () => dispatch({ type: actionTypes.CANCEL_CREATE_LIST }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListsPage);