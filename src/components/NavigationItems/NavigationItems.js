import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.navigationItems}>
    <NavigationItem link="/home" clicked={props.clicked}>Welcome</NavigationItem>
    <NavigationItem link="/board" clicked={props.clicked}>Boards</NavigationItem>
    <NavigationItem link="/signin" clicked={props.clicked}>Sign In</NavigationItem>
  </ul>
);

export default navigationItems;