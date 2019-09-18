import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Boards = ({ boards, deleted }) => {
  return(
    <div>
    {boards.map((board) => (
      <center key={board.id}>
        <Link to={`/board/${board.name}/${board.id}`}>
          <button className="btn btn-info board-button">
            <center><h6>{board.name}</h6></center>
          </button>
        </Link>
        <Link to={`/edit-board/${board.id}/${board.name}`}>
          <button className="btn btn-warning delete-button"><h6><FontAwesomeIcon icon="pencil-alt" /></h6></button>
        </Link>
        <button className="btn btn-danger delete-button" onClick={() => deleted(board.id)}><h6><FontAwesomeIcon icon="window-close" /></h6></button>
        <br />
      </center>
    ))}
  </div>
  )
}

export default Boards;