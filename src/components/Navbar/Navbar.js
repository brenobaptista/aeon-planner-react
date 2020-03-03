import React from 'react';

import classes from './Navbar.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const navbar = (props) => {
  const { drawerToggleClicked } = props;

  return (
    <div className={classes.navbar}>
      <DrawerToggle clicked={drawerToggleClicked} />
      <div className={classes.logo}>
        <Logo />
      </div>
      <nav className={classes.desktopOnly}>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default navbar;
