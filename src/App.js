import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import BoardsPage from './containers/BoardsPage/BoardsPage'
import Login from './containers/Login/Login'
import ListsPage from './containers/ListsPage/ListsPage'
import NewBoard from './containers/NewBoard/NewBoard'
import EditBoard from './containers/EditBoard/EditBoard'
import NewList from './containers/NewList/NewList'
import NewTask from './containers/NewTask/NewTask'
import EditList from './containers/EditList/EditList'
import EditTask from './containers/EditTask/EditTask'
import HTTP404 from './components/HTTP404/HTTP404'

import './App.css'

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Navbar />

          <Redirect from="/" to="/home" />
          <Switch>
            <Route exact path='/home' component={Home} />
            <Route exact path='/board' component={BoardsPage} />
            <Route exact path='/login' component={Login} />
            <Route path='/new-board' component={NewBoard} />
            <Route path='/edit-board/:boardId/:boardName' component={EditBoard} />
            <Route path='/board/:boardId/edit-list/:listId/:listName' component={EditList} />
            <Route path='/board/:boardId/new-list' component={NewList} />
            <Route path='/board/:boardId/list/:listId/new-task/' component={NewTask} />
            <Route path='/board/:boardId/list/:listId/edit-task/:taskName/:taskId/:taskDescription' component={EditTask} />
            <Route path='/board/:boardName/:boardId' component={ListsPage} />
            <Route component={HTTP404} />
          </Switch>

        </Router>
      </>
    );
  }
}

export default App;