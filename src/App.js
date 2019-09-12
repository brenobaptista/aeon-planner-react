import React, {Component} from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";

import Home from './Home'
import Lists from './Lists'
import NewBoard from './components/NewBoard/NewBoard'
import NewList from './components/NewList/NewList'
import NewTask from './components/NewTask/NewTask'

import './App.css'

class App extends Component {
  state = {
    isCollapsed: true
  }

  menuHandler = () => {
    this.setState((previousState) => ({
      isCollapsed: !previousState.isCollapsed
    }))
  }

  menuCloser = () => {
    this.setState({ isCollapsed: true })
  }

  render () {
    const collapsed = this.state.isCollapsed;
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler collapsed' : 'navbar-toggler'

    return (
      <>
        <Router>
          <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
            <NavLink to="/" className="navbar-brand">Aeon Planner</NavLink>
            <button onClick={this.menuHandler} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`${classOne}`} id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <NavLink to="/" className="nav-link" onClick={this.menuCloser}>Board List</NavLink>
                </li>
              </ul>
            </div>
          </nav>

          <Route exact path='/' component={Home} />
          <Switch>
            <Route exact path='/new-board' component={NewBoard} />
            <Route exact path='/new-list/:listId' component={NewList} />
            <Route exact path='/new-task/:listId' component={NewTask} />
            <Route exact path='/:listId' component={Lists} />
          </Switch>
          
        </Router>
      </>
    );
  }
}

export default App;