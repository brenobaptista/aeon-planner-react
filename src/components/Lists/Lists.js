import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './Lists.module.css';

const Lists = ({ lists, tasks, boardId, boardName, deleteL, deleteT }) => {
  return (
    <div>
      <div className={`shadow-sm card ${classes.card50} margin-t-b bg-light ${classes.greenText}`}>
        <div className="card-body">
          <center><h5 className="card-title">{boardName}</h5></center>
        </div>
      </div>

      <Link to={`/board/${boardId}/new-list`}><button className={`btn btn-success ${classes.marginBottom}`}>+ New List</button></Link>


      {lists.map((list) => {
        if (list.boardId === boardId) {
          return (
            <div key={list._id}>
              <div className={`shadow card ${classes.card80} bg-light ${classes.marginBottomCard}`}>
                <div className="card-body">
                  <center><h5 className={`card-title ${classes.greenText}`}>{list.name} 
                    <br />
                    <Link to={`/board/${boardId}/edit-list/${list._id}/${list.name}`}>
                      <button className={`btn btn-warning ${classes.listBtn}`}><FontAwesomeIcon icon="pencil-alt" /></button>
                    </Link>
                    <button className={`btn btn-danger ${classes.listBtn}`} onClick={() => {if (window.confirm('Are you sure you wish to delete this list?')) deleteL(list._id)}}><FontAwesomeIcon icon="window-close" /></button>
                  </h5></center>

                  <div className="container">
                    <div className="row">
                      {tasks.map((task) => {
                        if (task.listId === list._id) {
                          return(
                            <div className="col-md-4" key={task._id}>
                              <span className="card margin-t-b shadow-sm">
                                <div className="card-body">
                                  <center><h6 className={`card-title ${classes.greenText}`}>{task.name}</h6></center>
                                  <center><p className="card-text">{task.description}</p></center>
                                  <br />
                                  <center>
                                    {task.description ? 
                                      <Link to={`/board/${boardId}/list/${list._id}/edit-task/${task.name}/${task._id}/${task.description}`}>
                                        <button className={`btn btn-warning ${classes.listBtn}`}><FontAwesomeIcon icon="pencil-alt" /></button>
                                      </Link> 
                                      :
                                       <Link to={`/board/${boardId}/list/${list._id}/edit-task/${task.name}/${task._id}/australopithecus`}>
                                        <button className={`btn btn-warning ${classes.listBtn}`}><FontAwesomeIcon icon="pencil-alt" /></button>
                                      </Link>}
                                    <button className={`btn btn-danger ${classes.listBtn}`} onClick={() => {if (window.confirm('Are you sure you wish to delete this task?')) deleteT(task._id)}}><FontAwesomeIcon icon="window-close" /></button>
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
                    <Link to={`/board/${boardId}/list/${list._id}/new-task/`}><button className="btn btn-success">+ New Task</button></Link>
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