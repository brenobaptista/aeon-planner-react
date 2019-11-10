import React from 'react';
import classes from './Lists.module.css';
import { Button, Badge, Card, CardBody, CardTitle, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';

import Modal from '../Modal/Modal';
import NewList from '../../containers/NewList/NewList';
import NewTask from '../../containers/NewTask/NewTask';
import EditList from '../../containers/EditList/EditList';
import Tasks from '../Tasks/Tasks';
import * as actionTypes from '../../store/actions/actionTypes';

const Lists = ( props ) => {
  return (
    <>
      <Card className={`shadow-sm ${classes.card50} margin-t-b bg-light ${classes.greenText}`}>
        <CardBody>
          <CardTitle tag="h3" className={classes.marginCard}>
            {props.boardName}
          </CardTitle>
        </CardBody>
      </Card>

      {props.lists.map((list) => {
        if (list.boardId === props.boardId) {
          return (
            <div key={list._id}>
              <Card className={`shadow ${classes.card80} bg-light ${classes.marginBottomCard} ${classes.fixCard}`}>
                <div className={classes.flexContainer}>
                  <Badge color="link" className={classes.fixBadge2}>
                    <UncontrolledButtonDropdown size="sm" direction="left">
                      <DropdownToggle color="link" className={classes.fixBadge}>
                        <FontAwesomeIcon icon="cog" />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => props.modalEditList(list._id, list.name)}>Edit</DropdownItem>
                        <DropdownItem onClick={() => props.modalDeleteList(list._id)}>Delete</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </Badge>
                </div>

                <CardBody className={classes.paddingTasks}>
                  <CardTitle className={classes.greenText} tag="h4">
                    {list.name}
                  </CardTitle>

                  <Modal show={props.showEditListModal} clickBackdrop={props.cancelEditList}>
                    {props.showEditListModal ?
                      <EditList 
                        id={props.editListId} 
                        name={props.editListName} 
                        boardId={props.boardId} 
                        cancel={props.cancelEditList} 
                        finish={props.finish} 
                      />
                      : null
                    }
                  </Modal>

                  <Modal show={props.showDeleteListModal} clickBackdrop={props.cancelDeleteList}>
                    {props.showDeleteListModal ?
                      <div>
                        <h3 className={classes.greenText}>Are you sure you wish to delete it?</h3><br />
                        <Button color="danger" className="margin-teeth" onClick={props.cancelDeleteList}>Cancel</Button>
                        <Button color="success" className="margin-teeth" onClick={() => props.deleteList(props.deleteListId)}>Yes</Button>
                      </div>
                      : null}
                  </Modal>

                  <div className="container">
                    <div className="row">
                      {props.tasks.map((task) => {
                        if (task.listId === list._id) {
                          return (
                            <Tasks
                              key={task._id}
                              deleteTask={props.deleteTask}
                              taskId={task._id} 
                              taskName={task.name} 
                              taskDescription={task.description}
                              listId={list._id}
                              finish={props.finish}
                              clickBackdrop={props.clickBackdrop}
                            />
                          )
                        };
                        return null;
                      })}
                    </div>
                  </div>

                  <div className={classes.marginTop}>
                    <Button color="success" className={classes.marginBottom} onClick={() => props.modalCreateTask(list._id)}>+ New Task</Button>
                    <Modal show={props.showCreateTaskModal} clickBackdrop={props.cancelCreateTask}>
                      {props.showCreateTaskModal ? 
                        <NewTask 
                          cancel={props.cancelCreateTask} 
                          finish={props.finish} 
                          listId={props.createTaskListId} /> 
                        : null}
                    </Modal>
                  </div>

                  </CardBody>
              </Card>
            </div>
          )
        };
        return null;
      }
      )}

      <Button color="success" className={classes.marginBottom} onClick={props.modalCreateList}>+ New List</Button>
      <Modal show={props.showCreateListModal} clickBackdrop={props.cancelCreateList}>
        {props.showCreateListModal ? 
          <NewList 
            cancel={props.cancelCreateList} 
            finish={props.finish} 
            boardId={props.boardId} 
          /> 
          : null
        }
      </Modal>
    </>
  )
}

const mapStateToProps = state => {
  return {
    showCreateTaskModal: state.task.showCreateTaskModal,
    createTaskListId: state.task.createTaskListId,
    showDeleteListModal: state.list.showDeleteListModal,
    deleteListId: state.list.deleteListId,
    showCreateListModal: state.list.showCreateListModal,
    showEditListModal: state.list.showEditListModal,
    editListId: state.list.editListId,
    editListName: state.list.editListName,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    modalCreateTask: (listId) => dispatch({ type: actionTypes.MODAL_CREATE_TASK, listId }),
    cancelCreateTask: () => dispatch({ type: actionTypes.CANCEL_CREATE_TASK }),
    modalDeleteList: (listId) => dispatch({ type: actionTypes.MODAL_DELETE_LIST, listId }),
    cancelDeleteList: () => dispatch({ type: actionTypes.CANCEL_DELETE_LIST }),
    modalEditList: (listId) => dispatch({ type: actionTypes.MODAL_EDIT_LIST, listId }),
    cancelEditList: () => dispatch({ type: actionTypes.CANCEL_EDIT_LIST }),
    modalCreateList: (listId) => dispatch({ type: actionTypes.MODAL_CREATE_LIST, listId }),
    cancelCreateList: () => dispatch({ type: actionTypes.CANCEL_CREATE_LIST }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);