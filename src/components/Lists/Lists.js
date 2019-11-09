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
              <Card className={`shadow ${classes.card80} bg-light ${classes.marginBottomCard}`}>
                <CardBody className={classes.paddingTasks}>
                  <CardTitle className={classes.greenText} tag="h4">
                    {list.name}
                    <Badge color="link" className={classes.fixBadge2}>
                      <UncontrolledButtonDropdown size="sm" direction="left">
                        <DropdownToggle color="link" className={classes.fixBadge}>
                          <FontAwesomeIcon icon="cog" />
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={() => props.editListButton(list._id, list.name)}>Edit</DropdownItem>
                          <DropdownItem onClick={() => props.deleteListButton(list._id)}>Delete</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </Badge>
                  </CardTitle>

                  <Modal show={props.editListState} clickBackdrop={props.clickBackdrop}>
                    {props.editListState ?
                      <EditList 
                        id={props.editListId} 
                        name={props.editListName} 
                        boardId={props.boardId} 
                        cancel={props.editListButton} 
                        finish={props.finish} 
                      />
                      : null
                    }
                  </Modal>

                  <Modal show={props.deleteListState} clickBackdrop={props.clickBackdrop}>
                    {props.deleteListState ?
                      <div>
                        <h3 className={classes.greenText}>Are you sure you wish to delete it?</h3><br />
                        <Button color="danger" className="margin-teeth" onClick={props.deleteListButton}>Cancel</Button>
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

      <Button color="success" className={classes.marginBottom} onClick={props.createList}>+ New List</Button>
      <Modal show={props.createListState} clickBackdrop={props.clickBackdrop}>
        {props.createListState ? 
          <NewList 
            cancel={props.createList} 
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
  }
};

const mapDispatchToProps = dispatch => {
  return {
    modalCreateTask: (listId) => dispatch({ type: actionTypes.MODAL_CREATE_TASK, listId }),
    cancelCreateTask: () => dispatch({ type: actionTypes.CANCEL_CREATE_TASK }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists);