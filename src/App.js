import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css'

import Navbar from './components/Navbar/Navbar';
import SideDrawer from './components/SideDrawer/SideDrawer';

import Home from './components/Home/Home';
import BoardsPage from './containers/BoardsPage/BoardsPage';
import Login from './containers/Login/Login';
import SignUp from './containers/SignUp/SignUp';
import ResetPassword from './containers/ResetPassword/ResetPassword';
import NewPassword from './containers/NewPassword/NewPassword';
import ListsPage from './containers/ListsPage/ListsPage';
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
              <Route exact path='/' component={Home} />
              <Route exact path='/board' component={BoardsPage} />
              <Route path='/login' component={Login} />
              <Route path='/signup' component={SignUp} />
              <Route exact path='/reset' component={ResetPassword} />
              <Route path='/reset/:token' component={NewPassword} />
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