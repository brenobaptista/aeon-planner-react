import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './Lists.module.css';

import Modal from '../Modal/Modal';
import NewList from '../../containers/NewList/NewList';
import NewTask from '../../containers/NewTask/NewTask';
import EditList from '../../containers/EditList/EditList';
import EditTask from '../../containers/EditTask/EditTask';

const Lists = ({ propsState, propsFunction }) => {
  return (
    <div>
      <div className={`shadow-sm card ${classes.card50} margin-t-b bg-light ${classes.greenText}`}>
        <div className="card-body">
          <center>
            <h4 className="card-title">{propsFunction.boardName}</h4>
          </center>
        </div>
      </div>

      <button className={`btn btn-success ${classes.marginBottom}`} onClick={propsFunction.createList}>+ New List</button>
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

      {propsState.lists.map((list) => {
        if (list.boardId === propsFunction.boardId) {
          return (
            <div key={list._id}>
              <div className={`shadow card ${classes.card80} bg-light ${classes.marginBottomCard}`}>
                <div className="card-body">
                  <center>
                    <h4 className={`card-title ${classes.greenText}`}>{list.name}</h4>
                    <button className={`btn btn-warning ${classes.listBtn}`} onClick={() => propsFunction.editListButton(list._id, list.name)}>
                      <FontAwesomeIcon icon="pencil-alt" />
                    </button>
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
                    <button className={`btn btn-danger ${classes.listBtn}`} onClick={propsFunction.deleteListButton}>
                      <FontAwesomeIcon icon="window-close" />
                    </button>
                    <Modal show={propsState.deleteListState} clickBackdrop={propsFunction.clickBackdrop}>
                      {propsState.deleteListState ?
                        <div>
                          <h3 className={classes.greenText}>Are you sure you wish to delete it?</h3><br />
                          <button className="btn btn-danger margin-teeth" onClick={propsFunction.deleteListButton}>Cancel</button>
                          <button className="btn btn-success margin-teeth" onClick={() => propsFunction.deleteList(list._id)}>Yes</button>
                        </div>
                        : null}
                    </Modal>
                  </center>

                  <div className="container">
                    <div className="row">
                      {propsState.tasks.map((task) => {
                        if (task.listId === list._id) {
                          return (
                            <div className="col-md-4" key={task._id}>
                              <span className={`card margin-t-b shadow-sm ${classes.whiteBg}`}>
                                <div className="card-body">
                                  <center><h6 className={`card-title ${classes.greenText}`}>{task.name}</h6></center>
                                  <center><p className="card-text">{task.description}</p></center>
                                  <br />
                                  <center>
                                    <button className={`btn btn-warning ${classes.listBtn}`} onClick={() => propsFunction.editTaskButton(task._id, task.name, task.description)}>
                                      <FontAwesomeIcon icon="pencil-alt" />
                                    </button>
                                    <Modal show={propsState.editTaskState} clickBackdrop={propsFunction.clickBackdrop}>
                                      {propsState.editTaskState ?
                                        <EditTask
                                          id={propsState.editTaskId}
                                          name={propsState.editTaskName}
                                          description={propsState.editTaskDescription}
                                          listId={list._id}
                                          cancel={propsFunction.editTaskButton}
                                          finish={propsFunction.finish}
                                        />
                                        : null
                                      }
                                    </Modal>
                                    <button className={`btn btn-danger ${classes.listBtn}`} onClick={propsFunction.deleteTaskButton}>
                                      <FontAwesomeIcon icon="window-close" />
                                    </button>
                                    <Modal show={propsState.deleteTaskState} clickBackdrop={propsFunction.clickBackdrop}>
                                      {propsState.deleteTaskState ?
                                        <div>
                                          <h3 className={classes.greenText}>Are you sure you wish to delete it?</h3><br />
                                          <button className="btn btn-danger margin-teeth" onClick={propsFunction.deleteTaskButton}>Cancel</button>
                                          <button className="btn btn-success margin-teeth" onClick={() => propsFunction.deleteTask(task._id)}>Yes</button>
                                        </div>
                                        : null}
                                    </Modal>
                                  </center>
                                </div>
                              </span>
                            </div>
                          )
                        };
                        return null;
                      })}
                    </div>
                  </div>

                  <div className={classes.marginTop}>
                    <button className={`btn btn-success ${classes.marginBottom}`} onClick={propsFunction.createTask}>+ New Task</button>
                    <Modal show={propsState.createTaskState} clickBackdrop={propsFunction.clickBackdrop}>
                      {propsState.createTaskState ? <NewTask cancel={propsFunction.createTask} finish={propsFunction.finish} listId={list._id} /> : null}
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          )
        };
        return null;
      }
      )}

    </div>
  )
}

export default Lists;