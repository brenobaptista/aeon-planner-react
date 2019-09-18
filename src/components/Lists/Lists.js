import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Lists = ({ lists, tasks, boardId, boardName, deleteL, deleteT }) => {
  return (
    <div>
      <div className="card small-card margin-t-b bg-light text-color">
        <div className="card-body">
          <center><h5 className="card-title">{boardName}</h5></center>
        </div>
      </div>

      <Link to={`/board/${boardId}/new-list`}><button className="btn btn-success button-margin">+ New List</button></Link>

      {lists.map((list) => {
        if (list.board_id === Number(boardId)) {
          return (
            <div key={list.id}>
              <div className="card medium-card bg-light">
                <div className="card-body">
                  <center><h5 className="card-title text-color">{list.name} 
                    <br />
                    <Link to={`/board/${boardId}/edit-list/${list.id}/${list.name}`}>
                      <button className="btn btn-warning list-button"><FontAwesomeIcon icon="pencil-alt" /></button>
                    </Link>
                    <button className="btn btn-danger list-button" onClick={() => deleteL(list.id)}><FontAwesomeIcon icon="window-close" /></button>
                  </h5></center>
                  

                {tasks.map((task) => {
                  if (task.list_id === Number(list.id)) {
                    return(
                      <span className="card margin-t-b" key={task.id}>
                        <div className="card-body">
                          <center><h6 className="card-title text-color">{task.name}</h6></center>
                          <center><p className="card-text">{task.description}</p></center>
                          <br />
                          <center>
                            <Link to={`/board/${boardId}/list/${list.id}/edit-task/${task.name}/${task.id}/${task.description}`}>
                              <button className="btn btn-warning list-button"><FontAwesomeIcon icon="pencil-alt" /></button>
                            </Link>
                            <button className="btn btn-danger list-button" onClick={() => deleteT(task.id)}><FontAwesomeIcon icon="window-close" /></button>
                          </center>
                        </div>
                      </span>
                    )
                  };
                  return null;
                })}

                  <br />
                  <Link to={`/board/${boardId}/list/${list.id}/new-task/`}><button className="btn btn-success">+ New Task</button></Link>

                </div>
              </div>
              <br />
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