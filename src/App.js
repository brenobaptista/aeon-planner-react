import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";

import Home from './Home'
import ListsPage from './ListsPage'
import NewBoard from './containers/NewBoard/NewBoard'
import EditBoard from './containers/EditBoard/EditBoard'
import NewList from './containers/NewList/NewList'
import NewTask from './containers/NewTask/NewTask'
import EditList from './containers/EditList/EditList'
import EditTask from './containers/EditTask/EditTask'
import HTTP404 from './components/HTTP404/HTTP404'

import './App.css'

class App extends Component {
/*   state = {
    isCollapsed: true
  }

  menuHandler = () => {
    this.setState((previousState) => ({
      isCollapsed: !previousState.isCollapsed
    }))
  }

  menuCloser = () => {
    this.setState({ isCollapsed: true })
  } */

  render() {
/*     const collapsed = this.state.isCollapsed;
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler collapsed' : 'navbar-toggler' */

    return (
      <>
        <Router>
          <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <NavLink to="/" className="navbar-brand">Aeon Planner</NavLink>
            
{/*             <button onClick={this.menuHandler} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            {<div className={`${classOne}`} id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <NavLink to="/" className="nav-link" onClick={this.menuCloser}>Board List</NavLink>
                </li>
              </ul>
            </div>} */}

          </nav>

          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/new-board' component={NewBoard} />
            <Route path='/edit-board/:boardId/:boardName' component={EditBoard} />
            <Route path='/board/:boardId/new-list' component={NewList} />
            <Route path='/board/:boardId/edit-list/:listId/:listName' component={EditList} />
            <Route path='/board/:boardId/list/:listId/new-task/' component={NewTask} />
            <Route path='/board/:boardId/list/:listId/edit-task/:taskName/:taskId/' component={EditTask} />
            <Route path='/board/:boardId' component={ListsPage} />
            <Route component={HTTP404} />
          </Switch>

        </Router>
      </>
    );
  }
}

export default App;