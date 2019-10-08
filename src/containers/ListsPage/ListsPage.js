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

  deleteListHandler = async (listId) => {
    await axios.delete(`https://trello-api-nodejs.herokuapp.com/lists/${listId}`);
    this.setState(prevState => {
      const updatedLists = prevState.lists.filter(list => list._id !== listId);
      return { lists: updatedLists }
    })
  }

  deleteTaskHandler = async (taskId) => {
    await axios.delete(`https://trello-api-nodejs.herokuapp.com/tasks/${taskId}`);
    this.setState(prevState => {
      const updatedTasks = prevState.tasks.filter(task => task._id !== taskId);
      return { tasks: updatedTasks }
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