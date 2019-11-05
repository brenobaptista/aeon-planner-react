import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'reactstrap';
import classes from './Boards.module.css';
import Modal from '../Modal/Modal';
import EditBoard from '../../containers/EditBoard/EditBoard';
import NewBoard from '../../containers/NewBoard/NewBoard';

const Boards = ({ propsState , propsFunction }) => {
  return (
    <>
      {propsState.boards.map((board) => (
        <div key={board._id}>
          <Link to={`/board/${board.name}/${board._id}`}>
            <Button color="info" className={`${classes.darkGreenBg} ${classes.boardBtn}`}>
              {board.name}
            </Button>
          </Link>
          <Button color="warning" className={classes.modBtn} onClick={() => propsFunction.editButton(board._id, board.name)}>
            <FontAwesomeIcon icon="pencil-alt" />
          </Button>
          <Modal show={propsState.editState} clickBackdrop={propsFunction.clickBackdrop}>
            {propsState.editState ? <EditBoard id={propsState.editBoardId} name={propsState.editBoardName} cancel={propsFunction.editButton} finish={propsFunction.finish} /> : null}
          </Modal>
          <Button color="danger" className={classes.modBtn} onClick={propsFunction.deleteButton}>
            <FontAwesomeIcon icon="window-close" />
          </Button>
          <Modal show={propsState.deleteState} clickBackdrop={propsFunction.clickBackdrop}>
            {propsState.deleteState ?
              <div>
                <h3 className={classes.greenText}>Are you sure you wish to delete it?</h3><br />
                <Button color="danger" className="margin-teeth" onClick={propsFunction.deleteButton}>Cancel</Button>
                <Button color="success" className="margin-teeth" onClick={() => propsFunction.deleted(board._id)}>Yes</Button>
              </div>
              : null}
          </Modal>
        </div>
      ))}

      <Button color="success" className={classes.marginTop} onClick={propsFunction.createButton}>+ New Board</Button>
      <Modal show={propsState.createState} clickBackdrop={propsFunction.clickBackdrop}>
        {propsState.createState ? <NewBoard cancel={propsFunction.createButton} finish={propsFunction.finish} /> : null}
      </Modal>
    </>
  )
}

export default Boards;