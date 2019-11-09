import React from 'react';
import { connect } from 'react-redux';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import * as actionCreators from '../../store/actions/index';

const navigationItems = (props) => (
  <ul className={classes.navigationItems}>
    {props.token ? 
      <>
        <NavigationItem link="/board" clicked={props.clicked}>Boards</NavigationItem>
        <NavigationItem link="/login" clicked={props.authLogout}>Logout</NavigationItem>
      </>
      :
      <>
        <NavigationItem link="/" clicked={props.clicked}>Welcome</NavigationItem>
        <NavigationItem link="/login" clicked={props.clicked}>Login</NavigationItem>
      </>
    }
  </ul>
);

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    authLogout: () => dispatch(actionCreators.authLogout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(navigationItems);