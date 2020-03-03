import React from 'react';

import Logo from '../../images/logo192.png';
import classes from './Logo.module.css';

const logo = () => (
  <div className={classes.logo}>
    <img src={Logo} alt="aeon planner" />
  </div>
);

export default logo;
