import React from 'react';
import './Boards.css';

import { Link } from "react-router-dom";

const Boards = ({ boards }) => {
    return (
        <div>
            {boards.map( (board) => (
                <Link to={`/${board.id}`} key={board.id}>
                    <div className="card small-card bg-light">
                        <div className="card-body">
                            <h5 className="card-title">{board.name}</h5>              
                        </div>
                    </div>
                    <br />
                </Link>
            ))}
        </div>
    )
}

export default Boards;