import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import './App.css'

import Navbar from './components/Navbar/Navbar';
import SideDrawer from './components/SideDrawer/SideDrawer';

import Home from './components/Home/Home'
import BoardsPage from './containers/BoardsPage/BoardsPage'
import SignIn from './containers/SignIn/SignIn'
import SignUp from './containers/SignUp/SignUp'
import ListsPage from './containers/ListsPage/ListsPage'
import NewList from './containers/NewList/NewList'
import NewTask from './containers/NewTask/NewTask'
import EditList from './containers/EditList/EditList'
import EditTask from './containers/EditTask/EditTask'
const HTTP404 = React.lazy(() => import('./components/HTTP404/HTTP404'));

class App extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerToggleHandler = () => {
    this.setState(prevState => ({
      showSideDrawer: !prevState.showSideDrawer
    }));
  }

  render() {
    return (
      <>
        <Router>
          <Navbar drawerToggleClicked={this.sideDrawerToggleHandler} />
          <SideDrawer
            open={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler} />
          <div className="marginForNavbar">
            <Switch>
              <Redirect exact from="/" to="/home" />
              <Route exact path='/home' component={Home} />
              <Route exact path='/board' component={BoardsPage} />
              <Route exact path='/signin' component={SignIn} />
              <Route exact path='/signup' component={SignUp} />
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
          </div>

        </Router>
      </>
    );
  }
}

export default App;