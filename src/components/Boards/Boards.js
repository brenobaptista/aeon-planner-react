import React from 'react';
import './Boards.css';

const Boards = ({ boards }) => {
    return (
        <div>
            {boards.map( (board) => (
                <a href={`/${board.id}`} key={board.id}>
                    <div className="card small-card">
                        <div className="card-body">
                            <h5 className="card-title">{board.name}</h5>              
                        </div>
                    </div>
                    <br />
                </a>
            ))}
        </div>
    )
}

export default Boards;