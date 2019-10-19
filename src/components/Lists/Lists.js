import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './Lists.module.css';

import Modal from '../Modal/Modal';
import NewList from '../../containers/NewList/NewList';
import NewTask from '../../containers/NewTask/NewTask';
import EditList from '../../containers/EditList/EditList';
import EditTask from '../../containers/EditTask/EditTask';

const Lists = ({ lists, tasks, boardId, boardName, createList, createTask, createListState, createTaskState, editListState, editTaskState, editListButton, editTaskButton, editListId, editListName, editTaskId, editTaskName, editTaskDescription, finish, deleteList, deleteTask, deleteListButton, deleteTaskButton, deleteListState, deleteTaskState, clickBackdrop }) => {
  return (
    <div>
      <div className={`shadow-sm card ${classes.card50} margin-t-b bg-light ${classes.greenText}`}>
        <div className="card-body">
          <center>
            <h5 className="card-title">{boardName}</h5>
          </center>
        </div>
      </div>

      <button className={`btn btn-success ${classes.marginBottom}`} onClick={createList}>+ New List</button>
      <Modal show={createListState} clickBackdrop={clickBackdrop}>
        {createListState ? <NewList cancel={createList} finish={finish} boardId={boardId} /> : null}
      </Modal>

      {lists.map((list) => {
        if (list.boardId === boardId) {
          return (
            <div key={list._id}>
              <div className={`shadow card ${classes.card80} bg-light ${classes.marginBottomCard}`}>
                <div className="card-body">
                  <center>
                    <h5 className={`card-title ${classes.greenText}`}>{list.name}</h5>
                      <button className={`btn btn-warning ${classes.listBtn}`} onClick={() => editListButton(list._id, list.name)}><FontAwesomeIcon icon="pencil-alt" /></button>
                      <Modal show={editListState} clickBackdrop={clickBackdrop}>
                        {editListState ? <EditList id={editListId} name={editListName} boardId={boardId} cancel={editListButton} finish={finish} /> : null}
                      </Modal>
                      <button className={`btn btn-danger ${classes.listBtn}`} onClick={deleteListButton}><FontAwesomeIcon icon="window-close" /></button>
                      <Modal show={deleteListState} clickBackdrop={clickBackdrop}>
                        {deleteListState ?
                          <div>
                            <h3 className={classes.greenText}>Are you sure you wish to delete it?</h3><br />
                            <button className="btn btn-danger margin-teeth" onClick={deleteListButton}>Cancel</button>
                            <button className="btn btn-success margin-teeth" onClick={() => deleteList(list._id)}>Yes</button>
                          </div>
                          : null}
                      </Modal>
                  </center>

                  <div className="container">
                    <div className="row">
                      {tasks.map((task) => {
                        if (task.listId === list._id) {
                          return (
                            <div className="col-md-4" key={task._id}>
                              <span className="card margin-t-b shadow-sm">
                                <div className="card-body">
                                  <center><h6 className={`card-title ${classes.greenText}`}>{task.name}</h6></center>
                                  <center><p className="card-text">{task.description}</p></center>
                                  <br />
                                  <center>
                                    <button className={`btn btn-warning ${classes.listBtn}`} onClick={() => editTaskButton(task._id, task.name, task.description)}><h6><FontAwesomeIcon icon="pencil-alt" /></h6></button>
                                    <Modal show={editTaskState} clickBackdrop={clickBackdrop}>
                                      {editTaskState ? <EditTask id={editTaskId} name={editTaskName} description={editTaskDescription} listId={list._id} cancel={editTaskButton} finish={finish} /> : null}
                                    </Modal>
                                    <button className={`btn btn-danger ${classes.listBtn}`} onClick={deleteTaskButton}><FontAwesomeIcon icon="window-close" /></button>
                                    <Modal show={deleteTaskState} clickBackdrop={clickBackdrop}>
                                      {deleteTaskState ?
                                        <div>
                                          <h3 className={classes.greenText}>Are you sure you wish to delete it?</h3><br />
                                          <button className="btn btn-danger margin-teeth" onClick={deleteTaskButton}>Cancel</button>
                                          <button className="btn btn-success margin-teeth" onClick={() => deleteTask(task._id)}>Yes</button>
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
                    <button className={`btn btn-success ${classes.marginBottom}`} onClick={createTask}>+ New Task</button>
                    <Modal show={createTaskState} clickBackdrop={clickBackdrop}>
                      {createTaskState ? <NewTask cancel={createTask} finish={finish} listId={list._id} /> : null}
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