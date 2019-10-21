import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './Boards.module.css';
import Modal from '../Modal/Modal';
import EditBoard from '../../containers/EditBoard/EditBoard';
import NewBoard from '../../containers/NewBoard/NewBoard';

const Boards = ({ propsState , propsFunction }) => {
  return (
    <div>
      <button className={`btn btn-success ${classes.marginBottom}`} onClick={propsFunction.createButton}>+ New Board</button>
      <Modal show={propsState.createState} clickBackdrop={propsFunction.clickBackdrop}>
        {propsState.createState ? <NewBoard cancel={propsFunction.createButton} finish={propsFunction.finish} /> : null}
      </Modal>

      {propsState.boards.map((board) => (
        <center key={board._id}>
          <Link to={`/board/${board.name}/${board._id}`}>
            <button className={`btn btn-info ${classes.darkGreenBg} ${classes.boardBtn}`}>
              <center><h6>{board.name}</h6></center>
            </button>
          </Link>
          <button className={`btn btn-warning ${classes.modBtn}`} onClick={() => propsFunction.editButton(board._id, board.name)}>
            <FontAwesomeIcon icon="pencil-alt" />
          </button>
          <Modal show={propsState.editState} clickBackdrop={propsFunction.clickBackdrop}>
            {propsState.editState ? <EditBoard id={propsState.editBoardId} name={propsState.editBoardName} cancel={propsFunction.editButton} finish={propsFunction.finish} /> : null}
          </Modal>
          <button className={`btn btn-danger ${classes.modBtn}`} onClick={propsFunction.deleteButton}>
            <FontAwesomeIcon icon="window-close" />
          </button>
          <Modal show={propsState.deleteState} clickBackdrop={propsFunction.clickBackdrop}>
            {propsState.deleteState ?
              <div>
                <h3 className={classes.greenText}>Are you sure you wish to delete it?</h3><br />
                <button className="btn btn-danger margin-teeth" onClick={propsFunction.deleteButton}>Cancel</button>
                <button className="btn btn-success margin-teeth" onClick={() => propsFunction.deleted(board._id)}>Yes</button>
              </div>
              : null}
          </Modal>
        </center>
      ))}
    </div>
  )
}

export default Boards;