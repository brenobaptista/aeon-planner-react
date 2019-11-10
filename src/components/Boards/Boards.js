import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';

import classes from './Boards.module.css';
import Modal from '../Modal/Modal';
import EditBoard from '../../containers/EditBoard/EditBoard';
import NewBoard from '../../containers/NewBoard/NewBoard';
import * as actionTypes from '../../store/actions/actionTypes';

const Boards = ( props ) => {
  return (
    <>
      {props.boards.map((board) => (
        <div key={board._id}>
          <Link to={`/board/${board.name}/${board._id}`}>
            <Button color="info" className={`${classes.darkGreenBg} ${classes.boardBtn}`}>
              {board.name}
            </Button>
          </Link>

          <UncontrolledButtonDropdown direction="left">
            <DropdownToggle color="info" className={classes.modBtn}>
              <FontAwesomeIcon icon="cog" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => props.modalEditBoard(board._id, board.name)}>Edit</DropdownItem>
              <DropdownItem onClick={props.modalDeleteBoard}>Delete</DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>

          <Modal show={props.showEditModal} clickBackdrop={props.cancelEditBoard}>
            {props.showEditModal ? <EditBoard id={props.editBoardId} name={props.editBoardName} cancel={props.cancelEditBoard} finish={props.finish} /> : null}
          </Modal>

          <Modal show={props.showDeleteModal} clickBackdrop={props.cancelDeleteBoard}>
            {props.showDeleteModal ?
              <div>
                <h3 className={classes.greenText}>Are you sure you wish to delete it?</h3><br />
                <Button color="danger" className="margin-teeth" onClick={props.cancelDeleteBoard}>Cancel</Button>
                <Button color="success" className="margin-teeth" onClick={() => props.deleted(board._id)}>Yes</Button>
              </div>
              : null}
          </Modal>
        </div>
      ))}

      <Button color="success" className={classes.marginTop} onClick={props.modalCreateBoard}>+ New Board</Button>
      <Modal show={props.showCreateModal} clickBackdrop={props.cancelCreateBoard}>
        {props.showCreateModal ? <NewBoard cancel={props.cancelCreateBoard} finish={props.finish} /> : null}
      </Modal>
    </>
  )
}

const mapStateToProps = state => {
  return {
    showDeleteModal: state.board.showDeleteModal,
    showCreateModal: state.board.showCreateModal,
    showEditModal: state.board.showEditModal,
    editBoardId: state.board.editBoardId,
    editBoardName: state.board.editBoardName,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    modalDeleteBoard: () => dispatch({ type: actionTypes.MODAL_DELETE_BOARD }),
    cancelDeleteBoard: () => dispatch({ type: actionTypes.CANCEL_DELETE_BOARD }),
    modalEditBoard: (boardId, boardName) => dispatch({ type: actionTypes.MODAL_EDIT_BOARD, boardId, boardName }),
    cancelEditBoard: () => dispatch({ type: actionTypes.CANCEL_EDIT_BOARD }),
    modalCreateBoard: () => dispatch({ type: actionTypes.MODAL_CREATE_BOARD }),
    cancelCreateBoard: () => dispatch({ type: actionTypes.CANCEL_CREATE_BOARD }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
