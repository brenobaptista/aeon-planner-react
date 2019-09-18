import React, { Component } from 'react'
import Lists from './components/Lists/Lists';
import axios from 'axios';

class ListsPage extends Component {
  state = {
    lists: [],
    tasks: [],
    isLoaded: false
  }

  componentDidMount() {
    this.getHandler();
  }

  getHandler = () => {
    axios.get(`https://trello-api-second.herokuapp.com/lists/`)
      .then(response => {
        this.setState({
          lists: response.data
        })
      })
      .then(() => axios.get(`https://trello-api-second.herokuapp.com/tasks/`))
      .then(response => {
        this.setState({
          tasks: response.data,
          isLoaded: true
        })
      })
  }

  deleteListHandler = (list_id) => {
    axios.delete(`https://trello-api-second.herokuapp.com/lists/${list_id}`)
      .then( () => this.getHandler() )
  }

  deleteTaskHandler = (task_id) => {
    axios.delete(`https://trello-api-second.herokuapp.com/tasks/${task_id}`)
      .then( () => this.getHandler() )
  }

  render() {
    const boardId = this.props.match.params.boardId;
    const boardName = this.props.match.params.boardName;

    return (
      <>
        {this.state.isLoaded ? 
          <div>
            <Lists 
              lists={this.state.lists}
              tasks={this.state.tasks} 
              boardId={boardId} 
              boardName={boardName}
              deleteL={this.deleteListHandler}
              deleteT={this.deleteTaskHandler} />
          </div>
          : <center className="margin-t-b"><h2>Loading lists...</h2></center>
        }
      </>
    )
  }
}

export default ListsPage