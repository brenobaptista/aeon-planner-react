import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './Boards.module.css';
import Modal from '../Modal/Modal';
import EditBoard from '../../containers/EditBoard/EditBoard';

const Boards = ({ boards, deleted, modalButton, editState, clickBackdrop, editBoardId, editBoardName, cancel, finish }) => {
  return(
    <div>
    {boards.map((board) => (
      <center key={board._id}>
        <Link to={`/board/${board.name}/${board._id}`}>
          <button className={`btn btn-info ${classes.boardBtn}`}>
            <center><h6>{board.name}</h6></center>
          </button>
        </Link>
        <button className={`btn btn-warning ${classes.modBtn}`} onClick={() => modalButton(board._id, board.name)}><h6><FontAwesomeIcon icon="pencil-alt" /></h6></button>
        <Modal show={editState} clickBackdrop={clickBackdrop}>
          {editState ? <EditBoard id={editBoardId} name={editBoardName} cancel={cancel} finish={finish} /> : null}
        </Modal>
        <button className={`btn btn-danger ${classes.modBtn}`} onClick={() => {if (window.confirm('Are you sure you wish to delete this board?')) deleted(board._id)}}><h6><FontAwesomeIcon icon="window-close" /></h6></button>
      </center>
    ))}
  </div>
  )
}

export default Boards;