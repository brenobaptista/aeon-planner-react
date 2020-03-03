import React from 'react';
import { connect } from 'react-redux';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import * as actionCreators from '../../store/actions/index';

const navigationItems = (props) => {
  const { token, clicked, authLogout } = props;

  return (
    <ul className={classes.navigationItems}>
      {token ? (
        <>
          <NavigationItem link="/board" clicked={clicked}>
            Boards
          </NavigationItem>
          <NavigationItem link="/login" clicked={authLogout}>
            Logout
          </NavigationItem>
        </>
      ) : (
        <>
          <NavigationItem link="/" clicked={clicked}>
            Welcome
          </NavigationItem>
          <NavigationItem link="/login" clicked={clicked}>
            Login
          </NavigationItem>
        </>
      )}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  authLogout: () => dispatch(actionCreators.authLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(navigationItems);
