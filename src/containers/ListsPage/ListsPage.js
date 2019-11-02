import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

import Lists from '../../components/Lists/Lists';
import Spinner from '../../components/Spinner/Spinner'

class ListsPage extends Component {
  state = {
    lists: [],
    tasks: [],
    isLoaded: false,
    showCreateListModal: false,
    showCreateTaskModal: false,
    showEditListModal: false,
    showEditTaskModal: false,
    editListId: '',
    editListName: '',
    editTaskId: '',
    editTaskName: '',
    editTaskDescription: '',
    showDeleteListModal: false,
    showDeleteTaskModal: false,
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
      showCreateTaskModal: false,
      showEditListModal: false,
      showEditTaskModal: false,
    })
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
        showDeleteTaskModal: !prevState.showDeleteTaskModal
       }
    })
  }

  modalCreateListHandler = () => {
    this.setState(prevState => ({
      showCreateListModal: !prevState.showCreateListModal
    }))
  }

  modalCreateTaskHandler = () => {
    this.setState(prevState => ({
      showCreateTaskModal: !prevState.showCreateTaskModal
    }))
  }

  modalEditListHandler = (listId, listName) => {
    this.setState(prevState => ({
      showEditListModal: !prevState.showEditListModal,
      editListId: listId,
      editListName: listName
    }))
  }

  modalEditTaskHandler = (taskId, taskName, taskDescription) => {
    this.setState(prevState => ({
      showEditTaskModal: !prevState.showEditTaskModal,
      editTaskId: taskId,
      editTaskName: taskName,
      editTaskDescription: taskDescription
    }))
  }

  modalDeleteListHandler = () => {
    this.setState(prevState => ({
      showDeleteListModal: !prevState.showDeleteListModal
    }))
  }

  modalDeleteTaskHandler = () => {
    this.setState(prevState => ({
      showDeleteTaskModal: !prevState.showDeleteTaskModal
    }))
  }

  clickBackdrop = () => {
    this.setState({
      showCreateListModal: false,
      showCreateTaskModal: false,
      showEditListModal: false,
      showEditTaskModal: false,
      showDeleteListModal: false,
      showDeleteTaskModal: false,
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
                propsState={{
                  lists: this.state.lists,
                  tasks: this.state.tasks,
                  deleteListState: this.state.showDeleteListModal,
                  deleteTaskState: this.state.showDeleteTaskModal,
                  editListId: this.state.editListId,
                  editListName: this.state.editListName,
                  editTaskId: this.state.editTaskId,
                  editTaskName: this.state.editTaskName,
                  editTaskDescription: this.state.editTaskDescription,
                  createListState: this.state.showCreateListModal,
                  createTaskState: this.state.showCreateTaskModal,
                  editListState: this.state.showEditListModal,
                  editTaskState: this.state.showEditTaskModal,
                }}
                propsFunction={{
                  boardId: this.props.match.params.boardId,
                  boardName: this.props.match.params.boardName,
                  createList: this.modalCreateListHandler,
                  createTask: this.modalCreateTaskHandler,
                  editListButton: this.modalEditListHandler,
                  editTaskButton: this.modalEditTaskHandler,
                  finish: this.listHandler,
                  deleteList: this.deleteListHandler,
                  deleteTask: this.deleteTaskHandler,
                  deleteListButton: this.modalDeleteListHandler,
                  deleteTaskButton: this.modalDeleteTaskHandler,
                  clickBackdrop: this.clickBackdrop,
                }}
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
    token: state.token,
    userId: state.userId,
  }
};

export default connect(mapStateToProps)(ListsPage);