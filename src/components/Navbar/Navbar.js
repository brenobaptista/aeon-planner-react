import React from 'react';

import classes from './Navbar.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const navbar = (props) => (
  <div className={classes.navbar}>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className={classes.logo}>
      <Logo />
    </div>
    <nav className={classes.desktopOnly}>
      <NavigationItems />
    </nav>
  </div>
);

export default navbar;