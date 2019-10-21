import React, { Component } from 'react'
import Boards from '../../components/Boards/Boards';
import axios from 'axios';
import classes from './BoardsPage.module.css';
import Spinner from '../../components/Spinner/Spinner'

import '../../App.css'

class Home extends Component {
  state = {
    boards: [],
    isLoaded: false,
    editBoardId: '',
    editBoardName: '',
    showCreateModal: false,
    showEditModal: false,
    showDeleteModal: false,
  }

  componentDidMount() {
    this.boardHandler()
  }
  
  boardHandler = async () => {
    const response = await axios.get('https://trello-api-nodejs.herokuapp.com/boards/');
    this.setState({
      boards: response.data,
      isLoaded: true,
      showCreateModal: false,
      showEditModal: false,
    })
  }

  deleteHandler = async (boardId) => {
    await axios.delete(`https://trello-api-nodejs.herokuapp.com/boards/${boardId}`);
    this.setState(prevState => {
      const updatedBoards = prevState.boards.filter(board => board._id !== boardId);
      return {
        boards: updatedBoards,
        showDeleteModal: !prevState.showDeleteModal
      }
    })
  }

  modalCreateHandler = () => {
    this.setState(prevState => ({
      showCreateModal: !prevState.showCreateModal
    }))
  }

  modalEditHandler = (boardId, boardName) => {
    this.setState(prevState => ({
      showEditModal: !prevState.showEditModal,
      editBoardId: boardId,
      editBoardName: boardName
    }))
  }

  modalDeleteHandler = () => {
    this.setState(prevState => ({
      showDeleteModal: !prevState.showDeleteModal
    }))
  }

  clickBackdrop = () => {
    this.setState({
      showCreateModal: false,
      showEditModal: false,
      showDeleteModal: false
    })
  }

  render() {
    return (
      <>
        <center className="margin-t-b">
          <h1 className={classes.marginBottom}>All Boards</h1>
          {this.state.isLoaded ?
            <div>
              <Boards
                propsState={{
                  boards: this.state.boards,
                  createState: this.state.showCreateModal,
                  editBoardId: this.state.editBoardId,
                  editBoardName: this.state.editBoardName,
                  editState: this.state.showEditModal,
                  deleteState: this.state.showDeleteModal,
                }}
                propsFunction={{
                  deleted: this.deleteHandler,
                  createButton: this.modalCreateHandler,
                  editButton: this.modalEditHandler,
                  deleteButton: this.modalDeleteHandler,
                  clickBackdrop: this.clickBackdrop,
                  finish: this.boardHandler,
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

export default Home