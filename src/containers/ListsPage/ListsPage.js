/* eslint-disable no-unused-vars */
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

  async componentDidMount() {
    const responseLists = await axios.get(`https://trello-api-nodejs.herokuapp.com/lists/`);
    this.setState({ lists: responseLists.data });
    const responseTasks = await axios.get(`https://trello-api-nodejs.herokuapp.com/tasks/`);
    this.setState({
      tasks: responseTasks.data,
      isLoaded: true
    })
  }

  deleteListHandler = async (list_id) => {
    const itemDeleted = await axios.delete(`https://trello-api-nodejs.herokuapp.com/lists/${list_id}`);
    this.setState(prevState => {
      const updatedItems = prevState.lists.filter(item => item._id !== list_id);
      return { lists: updatedItems }
    })
  }

  deleteTaskHandler = async (task_id) => {
    const itemDeleted = await axios.delete(`https://trello-api-nodejs.herokuapp.com/tasks/${task_id}`);
    this.setState(prevState => {
      const updatedItems = prevState.tasks.filter(item => item._id !== task_id);
      return { tasks: updatedItems }
    })
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