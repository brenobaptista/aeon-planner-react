import React from 'react';

import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../Backdrop/Backdrop';

const sideDrawer = (props) => {
  let toggleClass = props.open ? classes.open : classes.close;

  return (
    <>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={`${classes.sideDrawer} ${toggleClass}`}>
        <div className={classes.logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems clicked={props.closed} />
        </nav>
      </div>
    </>
  );
};

export default sideDrawer;