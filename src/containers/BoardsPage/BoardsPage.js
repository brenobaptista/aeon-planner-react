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
    isCreateModalOpen: false,
    isEditModalOpen: false,
    isDeleteModalOpen: false,
    editBoardId: '',
    editBoardName: ''
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
      return { 
        boards: updatedBoards,
        isDeleteModalOpen: !prevState.isDeleteModalOpen
      }
    })
  }

  modalCreateHandler = () => {
    this.setState(prevState => ({
      isCreateModalOpen: !prevState.isCreateModalOpen
    }))
  }

  modalEditHandler = (boardId, boardName) => {
    this.setState(prevState => ({
      isEditModalOpen: !prevState.isEditModalOpen,
      editBoardId: boardId,
      editBoardName: boardName
    }))
  }

  modalDeleteHandler = () => {
    this.setState(prevState => ({
      isDeleteModalOpen: !prevState.isDeleteModalOpen
    }))
  }

  clickBackdrop = () => {
    this.setState({ 
      isCreateModalOpen: false,
      isEditModalOpen: false,
      isDeleteModalOpen: false
     })
  }

  createBoardHandler = async () => {
    const response = await axios.get('https://trello-api-nodejs.herokuapp.com/boards/');
    this.setState({
      boards: response.data,
      isLoaded: true,
      isCreateModalOpen: false
    })
  }

  editBoardHandler = async () => {
    const response = await axios.get('https://trello-api-nodejs.herokuapp.com/boards/');
    this.setState({
      boards: response.data,
      isLoaded: true,
      isEditModalOpen: false
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
              <Modal show={this.state.isCreateModalOpen} clickBackdrop={this.clickBackdrop}>
                <NewBoard cancel={this.modalCreateHandler} finish={this.createBoardHandler} />
              </Modal> 
              <Boards 
                boards={this.state.boards} 
                deleted={this.deleteHandler} 
                editButton={this.modalEditHandler} 
                deleteButton={this.modalDeleteHandler}
                editState={this.state.isEditModalOpen} 
                deleteState={this.state.isDeleteModalOpen}
                clickBackdrop={this.clickBackdrop}
                editBoardId={this.state.editBoardId}
                editBoardName={this.state.editBoardName}
                cancel={this.modalEditHandler}
                finish={this.editBoardHandler} />
            </div>
            : <Spinner />
          }
        </center>
      </>
    )
  }
}

export default Home