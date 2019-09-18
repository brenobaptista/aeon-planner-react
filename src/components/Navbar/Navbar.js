import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
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
  
  render() {
    const collapsed = this.state.isCollapsed;
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler collapsed' : 'navbar-toggler'

    return (
      <nav className="navbar navbar-expand-lg navbar-dark navbar-color">
        <NavLink to="/board" className="navbar-brand">Aeon Planner</NavLink>

        <button onClick={this.menuHandler} className={`${classTwo}`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {<div className={`${classOne}`} id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink to="/home" className="nav-link" onClick={this.menuCloser}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/board" className="nav-link" onClick={this.menuCloser}>Boards</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/login" className="nav-link" onClick={this.menuCloser}>Login</NavLink>
            </li>
          </ul>
        </div>}

      </nav>
    )

  }
}

export default Navbar;
