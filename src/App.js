import React, {Component} from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import Home from './Home'
import Lists from './Lists'

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
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Aeon Planner</a>
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
          <Route path='/:listId' exact component={Lists} />
          
        </Router>
      </>
    );
  }
}

export default App;