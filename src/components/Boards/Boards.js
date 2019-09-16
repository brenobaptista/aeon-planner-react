import React from 'react';

import { Link } from "react-router-dom";

const Boards = ({ boards, deleted }) => {
  return(
    <div>
    {boards.map((board) => (
      <center key={board.id}>
        <Link to={`/${board.id}`}>
          <button className="btn btn-info board-button">
            <center><h5>{board.name}</h5></center>
          </button>
        </Link>
        <Link to={`/edit-board/${board.id}/${board.name}`}>
          <button className="btn btn-warning delete-button">Edit</button>
        </Link>
        <button className="btn btn-danger delete-button" onClick={() => deleted(board.id)}>Delete</button>
        <br />
      </center>
    ))}
  </div>
  )
}

export default Boards;