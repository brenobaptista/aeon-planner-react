import React from 'react';
import classes from './Lists.module.css';
import { Button, Badge, Card, CardBody, CardTitle, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Modal from '../Modal/Modal';
import NewList from '../../containers/NewList/NewList';
import NewTask from '../../containers/NewTask/NewTask';
import EditList from '../../containers/EditList/EditList';
import Tasks from '../Tasks/Tasks';

const Lists = ({ propsState, propsFunction }) => {
  return (
    <>
      <Card className={`shadow-sm ${classes.card50} margin-t-b bg-light ${classes.greenText}`}>
        <CardBody>
          <CardTitle tag="h3">
            {propsFunction.boardName}
          </CardTitle>
        </CardBody>
      </Card>

      {propsState.lists.map((list) => {
        if (list.boardId === propsFunction.boardId) {
          return (
            <div key={list._id}>
              <Card className={`shadow ${classes.card80} bg-light ${classes.marginBottomCard}`}>
                <CardBody className={classes.paddingTasks}>
                  <CardTitle className={classes.greenText} tag="h4">
                    {list.name}
                    <Badge color="link" className={classes.fixBadge2}>
                      <UncontrolledButtonDropdown size="sm">
                        <DropdownToggle color="link" className={classes.fixBadge}>
                          <FontAwesomeIcon icon="cog" />
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={() => propsFunction.editListButton(list._id, list.name)}>Edit</DropdownItem>
                          <DropdownItem onClick={() => propsFunction.deleteListButton(list._id)}>Delete</DropdownItem>
                        </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </Badge>
                  </CardTitle>

                  <Modal show={propsState.editListState} clickBackdrop={propsFunction.clickBackdrop}>
                    {propsState.editListState ?
                      <EditList 
                        id={propsState.editListId} 
                        name={propsState.editListName} 
                        boardId={propsFunction.boardId} 
                        cancel={propsFunction.editListButton} 
                        finish={propsFunction.finish} 
                      />
                      : null
                    }
                  </Modal>

                  <Modal show={propsState.deleteListState} clickBackdrop={propsFunction.clickBackdrop}>
                    {propsState.deleteListState ?
                      <div>
                        <h3 className={classes.greenText}>Are you sure you wish to delete it?</h3><br />
                        <Button color="danger" className="margin-teeth" onClick={propsFunction.deleteListButton}>Cancel</Button>
                        <Button color="success" className="margin-teeth" onClick={() => propsFunction.deleteList(propsState.deleteListId)}>Yes</Button>
                      </div>
                      : null}
                  </Modal>

                  <div className="container">
                    <div className="row">
                      {propsState.tasks.map((task) => {
                        if (task.listId === list._id) {
                          return (
                            <Tasks
                              key={task._id}
                              taskId={task._id} 
                              taskName={task.name} 
                              taskDescription={task.description}
                              editTaskButton={propsFunction.editTaskButton}
                              editTaskState={propsState.editTaskState}
                              deleteTaskButton={propsFunction.deleteTaskButton} 
                              deleteTaskState={propsState.deleteTaskState}
                              deleteTask={propsFunction.deleteTask}
                              deleteTaskId={propsState.deleteTaskId}
                              clickBackdrop={propsFunction.clickBackdrop}
                              editTaskId={propsState.editTaskId}
                              editTaskName={propsState.editTaskName}
                              editTaskDescription={propsState.editTaskDescription}
                              editTaskListId={propsState.editTaskListId}
                              listId={list._id}
                              cancel={propsFunction.editTaskButton}
                              finish={propsFunction.finish}
                            />
                          )
                        };
                        return null;
                      })}
                    </div>
                  </div>

                  <div className={classes.marginTop}>
                    <Button color="success" className={classes.marginBottom} onClick={() => propsFunction.createTask(list._id)}>+ New Task</Button>
                    <Modal show={propsState.createTaskState} clickBackdrop={propsFunction.clickBackdrop}>
                      {propsState.createTaskState ? 
                        <NewTask 
                          cancel={propsFunction.createTask} 
                          finish={propsFunction.finish} 
                          listId={propsState.createTaskListId} /> 
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

      <Button color="success" className={classes.marginBottom} onClick={propsFunction.createList}>+ New List</Button>
      
      <Modal show={propsState.editListState} clickBackdrop={propsFunction.clickBackdrop}>
        {propsState.editListState ?
          <EditList 
            id={propsState.editListId} 
            name={propsState.editListName} 
            boardId={propsFunction.boardId} 
            cancel={propsFunction.editListButton} 
            finish={propsFunction.finish} 
          />
          : null
        }
      </Modal>
      
      <Modal show={propsState.createListState} clickBackdrop={propsFunction.clickBackdrop}>
        {propsState.createListState ? 
          <NewList 
            cancel={propsFunction.createList} 
            finish={propsFunction.finish} 
            boardId={propsFunction.boardId} 
          /> 
          : null
        }
      </Modal>

    </>
  )
}

export default Lists;