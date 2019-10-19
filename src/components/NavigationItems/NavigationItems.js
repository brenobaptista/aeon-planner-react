import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => (
  <ul className={classes.navigationItems}>
    <NavigationItem link="/" clicked={props.clicked}>Welcome</NavigationItem>
    <NavigationItem link="/board" clicked={props.clicked}>Boards</NavigationItem>
    <NavigationItem link="/login" clicked={props.clicked}>Login</NavigationItem>
  </ul>
);

export default navigationItems;