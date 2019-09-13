import React from 'react';
import { Link } from 'react-router-dom';

const Lists = ({ listInfo, lists }) => {
    return (
        <div>
            <div className="card small-card margin-t-b bg-light">
                <div className="card-body">
                    <center><h5 className="card-title">{listInfo.name}</h5></center>
                    <center><p className="card-text">Created at: {listInfo.created_at}</p></center>
                    <center><p className="card-text">Updated at: {listInfo.updated_at}</p></center>
                </div>
            </div>

            {lists.map( (list) => (
                <div key={list.id}>
                    <div className="card medium-card bg-light">
                        <div className="card-body">
                            <h5 className="card-title">{list.name}</h5>  

                            {list.tasks.map( (task) => (
                                <div className="card unit-card margin-t-b" key={task.id}>
                                    <div className="card-body">
                                        <center><h6 className="card-title">{task.name}</h6></center>
                                        <center><p className="card-text">{task.due ? `Due: ${task.due}` : 'Not due'}</p></center>
                                    </div>
                                </div>   
                            ))}

                            <Link to={`new-task/${list.id}`}><button className="btn btn-success">+ New Task</button></Link>

                        </div>
                    </div>
                    <br />
                </div>
            ))}

        </div>
    )
}

export default Lists;