import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import './App.css'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import ListsPage from './containers/ListsPage/ListsPage'
import NewBoard from './containers/NewBoard/NewBoard'
import EditBoard from './containers/EditBoard/EditBoard'
import NewList from './containers/NewList/NewList'
import NewTask from './containers/NewTask/NewTask'
import EditList from './containers/EditList/EditList'
import EditTask from './containers/EditTask/EditTask'
const Login = React.lazy(() => import('./containers/Login/Login'));
const BoardsPage = React.lazy(() => import('./containers/BoardsPage/BoardsPage'));
const HTTP404 = React.lazy(() => import('./components/HTTP404/HTTP404'));

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Navbar />

          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path='/home' component={Home} />
            <Route exact path='/board' render={() => (
              <Suspense fallback={<></>}>
                <BoardsPage />
              </Suspense>
            )} />
            <Route exact path='/login' render={() => (
              <Suspense fallback={<></>}>
                <Login />
              </Suspense>
            )} />
            <Route path='/new-board' component={NewBoard} />
            <Route path='/edit-board/:boardId/:boardName' component={EditBoard} />
            <Route path='/board/:boardId/edit-list/:listId/:listName' component={EditList} />
            <Route path='/board/:boardId/new-list' component={NewList} />
            <Route path='/board/:boardId/list/:listId/new-task/' component={NewTask} />
            <Route path='/board/:boardId/list/:listId/edit-task/:taskName/:taskId/:taskDescription' component={EditTask} />
            <Route path='/board/:boardName/:boardId' component={ListsPage} />
            <Route render={() => (
              <Suspense fallback={<></>}>
                <HTTP404 />
              </Suspense>
            )} />
          </Switch>

        </Router>
      </>
    );
  }
}

export default App;