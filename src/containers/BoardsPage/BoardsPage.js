import React, { Component } from 'react'
import Boards from '../../components/Boards/Boards';
import axios from 'axios';
import classes from './BoardsPage.module.css';
import Spinner from '../../components/Spinner/Spinner'
import Modal from '../../components/Modal/Modal';
import NewBoard from '../NewBoard/NewBoard';

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
              <button className={`btn btn-success ${classes.marginBottom}`} onClick={this.modalCreateHandler}>+ New Board</button>
              <Modal show={this.state.showCreateModal} clickBackdrop={this.clickBackdrop}>
                {this.state.showCreateModal ? <NewBoard cancel={this.modalCreateHandler} finish={this.boardHandler} /> : null}
              </Modal>
              <Boards
                boards={this.state.boards}
                deleted={this.deleteHandler}
                editButton={this.modalEditHandler}
                deleteButton={this.modalDeleteHandler}
                editState={this.state.showEditModal}
                deleteState={this.state.showDeleteModal}
                clickBackdrop={this.clickBackdrop}
                editBoardId={this.state.editBoardId}
                editBoardName={this.state.editBoardName}
                finish={this.boardHandler} />
            </div>
            : <Spinner />
          }
        </center>
      </>
    )
  }
}

export default Home