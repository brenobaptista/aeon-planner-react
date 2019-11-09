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
    showCreateListModal: false,
    showEditListModal: false,
    editListId: '',
    editListName: '',
    showDeleteListModal: false,
    deleteListId: '',
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
      showCreateListModal: false,
      showEditListModal: false,
    })
    this.props.editTaskCompleted();
    this.props.createTaskCompleted();
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
        showDeleteListModal: !prevState.showDeleteListModal,
       }
    })
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

  modalCreateListHandler = () => {
    this.setState(prevState => ({
      showCreateListModal: !prevState.showCreateListModal
    }))
  }

  modalEditListHandler = (listId, listName) => {
    this.setState(prevState => ({
      showEditListModal: !prevState.showEditListModal,
      editListId: listId,
      editListName: listName
    }))
  }

  modalDeleteListHandler = (listId) => {
    this.setState(prevState => ({
      showDeleteListModal: !prevState.showDeleteListModal,
      deleteListId: listId,
    }))
  }

  clickBackdrop = () => {
    this.setState({
      showCreateListModal: false,
      showEditListModal: false,
      showDeleteListModal: false,
    })
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
                deleteListState={this.state.showDeleteListModal}
                deleteListId={this.state.deleteListId}
                editListId={this.state.editListId}
                editListName={this.state.editListName}
                createListState={this.state.showCreateListModal}
                editListState={this.state.showEditListModal}
                deleteTask={this.deleteTaskHandler}
                createList={this.modalCreateListHandler}
                editListButton={this.modalEditListHandler}
                deleteList={this.deleteListHandler}
                deleteListButton={this.modalDeleteListHandler}
                finish={this.listHandler}
                clickBackdrop={this.clickBackdrop}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListsPage);