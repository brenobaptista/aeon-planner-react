import React from 'react';
import './Lists.css'

const Lists = ({ lists, listsLists }) => {
    return (
        <div>
            <div className="card small-card margin-t-b">
                <div className="card-body">
                    <center><h5 className="card-title">{lists.name}</h5></center>
                    <center><p className="card-text">Created at: {lists.created_at}</p></center>
                    <center><p className="card-text">Updated at: {lists.updated_at}</p></center>
                </div>
            </div>

            {listsLists.map( (list) => (
                <div key={list.id}>
                    <div className="card medium-card">
                        <div className="card-body">
                            <h5 className="card-title">{list.name}</h5>              
                        </div>
                    </div>
                    <br />
                </div>
            ))}

        </div>
    )
}

export default Lists;