import React from 'react';

import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../Backdrop/Backdrop';

const sideDrawer = (props) => {
  const { open, closed } = props;

  const toggleClass = open ? classes.open : classes.close;

  return (
    <>
      <Backdrop show={open} clicked={closed} />
      <div className={`${classes.sideDrawer} ${toggleClass}`}>
        <div className={classes.logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems clicked={closed} />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;
