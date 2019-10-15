import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './Boards.module.css';
import Modal from '../Modal/Modal';
import EditBoard from '../../containers/EditBoard/EditBoard';

const Boards = ({ boards, deleted, editButton, deleteButton, editState, deleteState, clickBackdrop, editBoardId, editBoardName, cancel, finish }) => {
  return(
    <div>
    {boards.map((board) => (
      <center key={board._id}>
        <Link to={`/board/${board.name}/${board._id}`}>
          <button className={`btn btn-info ${classes.boardBtn}`}>
            <center><h6>{board.name}</h6></center>
          </button>
        </Link>
        <button className={`btn btn-warning ${classes.modBtn}`} onClick={() => editButton(board._id, board.name)}><h6><FontAwesomeIcon icon="pencil-alt" /></h6></button>
        <Modal show={editState} clickBackdrop={clickBackdrop}>
          {editState ? <EditBoard id={editBoardId} name={editBoardName} cancel={cancel} finish={finish} /> : null}
        </Modal>
        <button className={`btn btn-danger ${classes.modBtn}`} onClick={deleteButton}><h6><FontAwesomeIcon icon="window-close" /></h6></button>
        <Modal show={deleteState} clickBackdrop={clickBackdrop}>
          <h3 style={{ color: '#00AB84' }}>Are you sure you wish to delete it?</h3><br />
          <button className="btn btn-danger margin-teeth" onClick={deleteButton}>Cancel</button>
          <button className="btn btn-success margin-teeth" onClick={() => deleted(board._id)}>Yes</button>
        </Modal>
      </center>
    ))}
  </div>
  )
}

export default Boards;