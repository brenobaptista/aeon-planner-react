import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => {
  const { link, clicked, children } = props;

  return (
    <li className={classes.navigationItem}>
      <NavLink
        to={link}
        exact
        activeClassName={classes.active}
        onClick={clicked}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
