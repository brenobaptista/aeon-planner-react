import React, { Component } from 'react'
import Lists from './components/Lists/Lists';
import axios from 'axios';

class ListsPage extends Component {
  state = {
    listInfo: {},
    lists: [],
    isLoaded: false
  }

  componentDidMount() {
    this.getHandler();
  }

  getHandler = () => {
    axios.get(`https://trellacens.herokuapp.com/boards/${this.props.match.params.boardId}`)
      .then(response => {
        this.setState({
          listInfo: response.data,
          lists: response.data.lists,
          isLoaded: true
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  deleteListHandler = (list_id) => {
    axios.delete(`https://trellacens.herokuapp.com/lists/${list_id}`)
      .then( () => this.getHandler() )
  }

  deleteTaskHandler = (task_id) => {
    axios.delete(`https://trellacens.herokuapp.com/tasks/${task_id}`)
      .then( () => this.getHandler() )
  }

  render() {
    const board_id = this.props.match.params.boardId;

    return (
      <>
        {this.state.isLoaded ? 
          <div>
            <Lists 
              listInfo={this.state.listInfo} 
              lists={this.state.lists} 
              board_id={board_id} 
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