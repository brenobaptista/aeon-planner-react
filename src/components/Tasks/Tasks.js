import React from 'react';
import {
  Button, Badge, Card, CardText, CardBody, CardTitle, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';

import classes from './Tasks.module.css';
import Modal from '../Modal/Modal';
import EditTask from '../../containers/EditTask/EditTask';
import * as actionTypes from '../../store/actions/actionTypes';

const Tasks = (props) => {
  const {
    taskName, taskDescription, showEditTaskModal, cancelEditTask, editTaskId, editTaskName,
    editTaskDescription, editTaskListId, finish, cancelDeleteTask, showDeleteTaskModal,
  } = props;

  return (
    <>
      <div className="col-md-4 col-sm-6">
        <Card className={`margin-t-b shadow-sm ${classes.whiteBg}`}>
          <div className={classes.flexContainer}>
            <Badge color="link" className={classes.fixBadge2}>
              <UncontrolledButtonDropdown direction="left">
                <DropdownToggle color="link" size="sm" className={classes.fixBadge}>
                  <FontAwesomeIcon icon="cog" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem
                    onClick={
                      () => props.modalEditTask(props.taskId, props.taskName, props.taskDescription, props.listId)
                    }
                  >
                    Edit
                  </DropdownItem>
                  <DropdownItem onClick={() => props.modalDeleteTask(props.taskId)}>
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </Badge>
          </div>
          <CardBody className={classes.fixCard}>
            <CardTitle className={classes.greenText} tag="h5">
              {taskName}
            </CardTitle>
            <CardText>
              {taskDescription}
            </CardText>
          </CardBody>
        </Card>
      </div>

      <Modal show={showEditTaskModal} clickBackdrop={cancelEditTask}>
        {showEditTaskModal ? (
          <EditTask
            id={editTaskId}
            name={editTaskName}
            description={editTaskDescription}
            listId={editTaskListId}
            cancel={cancelEditTask}
            finish={finish}
          />
        ) : null}
      </Modal>

      <Modal show={showDeleteTaskModal} clickBackdrop={cancelDeleteTask}>
        {showDeleteTaskModal ? (
          <div>
            <h3 className={classes.greenText}>Are you sure you wish to delete it?</h3>
            <br />
            <Button color="danger" className="margin-teeth" onClick={cancelDeleteTask}>Cancel</Button>
            <Button color="success" className="margin-teeth" onClick={() => props.deleteTask(props.deleteTaskId)}>
              Yes
            </Button>
          </div>
        ) : null}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => ({
  showDeleteTaskModal: state.task.showDeleteTaskModal,
  deleteTaskId: state.task.deleteTaskId,
  showEditTaskModal: state.task.showEditTaskModal,
  editTaskId: state.task.editTaskId,
  editTaskName: state.task.editTaskName,
  editTaskDescription: state.task.editTaskDescription,
  editTaskListId: state.task.editTaskListId,
});

const mapDispatchToProps = (dispatch) => ({
  modalDeleteTask: (taskId) => dispatch({
    type: actionTypes.MODAL_DELETE_TASK, taskId,
  }),
  cancelDeleteTask: () => dispatch({
    type: actionTypes.CANCEL_DELETE_TASK,
  }),
  modalEditTask: (taskId, taskName, taskDescription, listId) => dispatch({
    type: actionTypes.MODAL_EDIT_TASK, taskId, taskName, taskDescription, listId,
  }),
  cancelEditTask: () => dispatch({
    type: actionTypes.CANCEL_EDIT_TASK,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);
