import React, { Component } from 'react'
import Lists from '../../components/Lists/Lists';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner'

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
    axios.get(`https://trello-api-nodejs.herokuapp.com/lists/`)
      .then(response => {
        this.setState({
          lists: response.data
        })
      })
      .then(() => axios.get(`https://trello-api-nodejs.herokuapp.com/tasks/`))
      .then(response => {
        this.setState({
          tasks: response.data,
          isLoaded: true
        })
      })
  }

  deleteListHandler = (list_id) => {
    axios.delete(`https://trello-api-nodejs.herokuapp.com/lists/${list_id}`)
      .then( () => this.getHandler() )
  }

  deleteTaskHandler = (task_id) => {
    axios.delete(`https://trello-api-nodejs.herokuapp.com/tasks/${task_id}`)
      .then( () => this.getHandler() )
  }

  render() {
    const boardId = this.props.match.params.boardId;
    const boardName = this.props.match.params.boardName;

    return (
      <>
        <center>
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
            : <Spinner />
          }
        </center>
      </>
    )
  }
}

export default ListsPage