import React from 'react';
import './Lists.css'
import { Link } from 'react-router-dom';

const Lists = ({ lists, listsLists, myId }) => {
    return (
        <div>
            <div className="card small-card margin-t-b bg-light">
                <div className="card-body">
                    <center><h5 className="card-title">{lists.name}</h5></center>
                    <center><p className="card-text">Created at: {lists.created_at}</p></center>
                    <center><p className="card-text">Updated at: {lists.updated_at}</p></center>
                </div>
            </div>

            {listsLists.map( (list) => (
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

                            <Link to={`new-task/${myId}`}><button className="btn btn-success">+ New Task</button></Link>

                        </div>
                    </div>
                    <br />
                </div>
            ))}

        </div>
    )
}

export default Lists;